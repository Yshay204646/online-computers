$ErrorActionPreference = "Stop"

$mysqlRoot = Join-Path $env:LOCALAPPDATA "MySQL\MySQL-8.4.9\mysql-8.4.9-winx64"
$serverExecutable = Join-Path $mysqlRoot "bin\mysqld.exe"
$configFile = Join-Path $env:LOCALAPPDATA "MySQL\my-online-computers.ini"

if (-not (Test-Path -LiteralPath $serverExecutable)) {
  throw "MySQL Server was not found at $serverExecutable."
}

if (-not (Test-Path -LiteralPath $configFile)) {
  throw "MySQL configuration was not found at $configFile."
}

& $serverExecutable "--defaults-file=$configFile" --console
exit $LASTEXITCODE
