$ErrorActionPreference = "Stop"

$mysqlRoot = Join-Path $env:LOCALAPPDATA "MySQL\MySQL-8.4.9\mysql-8.4.9-winx64"
$serverExecutable = Join-Path $mysqlRoot "bin\mysqld.exe"
$configFile = Join-Path $env:LOCALAPPDATA "MySQL\my-online-computers.ini"
$logDirectory = Join-Path $env:LOCALAPPDATA "MySQL"
$stdoutLog = Join-Path $logDirectory "online-computers-mysql.stdout.log"
$stderrLog = Join-Path $logDirectory "online-computers-mysql.stderr.log"

if (-not (Test-Path -LiteralPath $serverExecutable)) {
  throw "MySQL Server was not found at $serverExecutable."
}

if (-not (Test-Path -LiteralPath $configFile)) {
  throw "MySQL configuration was not found at $configFile."
}

$existingServer = Get-CimInstance Win32_Process | Where-Object {
  $_.Name -eq "mysqld.exe" -and $_.ExecutablePath -eq $serverExecutable
} | Select-Object -First 1

$portOpen = Test-NetConnection -ComputerName 127.0.0.1 -Port 3306 -InformationLevel Quiet

if ($portOpen -and -not $existingServer) {
  throw "Port 3306 is already in use by a process other than this project's MySQL server."
}

if (-not $portOpen) {
  New-Item -ItemType Directory -Force -Path $logDirectory | Out-Null
  $arguments = @("--defaults-file=`"$configFile`"", "--console")
  $mysqlProcess = Start-Process `
    -FilePath $serverExecutable `
    -ArgumentList $arguments `
    -PassThru `
    -WindowStyle Hidden `
    -RedirectStandardOutput $stdoutLog `
    -RedirectStandardError $stderrLog

  $deadline = (Get-Date).AddSeconds(60)
  do {
    Start-Sleep -Seconds 1
    $mysqlProcess.Refresh()

    if ($mysqlProcess.HasExited) {
      $details = if (Test-Path -LiteralPath $stderrLog) {
        Get-Content -LiteralPath $stderrLog -Tail 20 | Out-String
      } else {
        "MySQL process exited with code $($mysqlProcess.ExitCode)."
      }

      throw "MySQL failed to start. $details"
    }

    $portOpen = Test-NetConnection -ComputerName 127.0.0.1 -Port 3306 -InformationLevel Quiet
  } while (-not $portOpen -and (Get-Date) -lt $deadline)
}

if (-not $portOpen) {
  throw "MySQL did not become available on 127.0.0.1:3306 within 60 seconds. Check $stderrLog."
}

Write-Output "MySQL is running and available on 127.0.0.1:3306."
