@echo off
REM --- LaunchBuilder.bat ---
REM This batch file executes the PowerShell script silently.
ECHO Running the Email Builder Update and Launch...
PowerShell.exe -NoProfile -ExecutionPolicy Bypass -File ".\maintenance\UpdateAndLaunch.ps1"
ECHO.
ECHO The Email Builder should now be open in your browser.
PAUSE
EXIT