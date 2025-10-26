# UpdateAndLaunch.ps1

Write-Host "Checking for updates from GitLab..." -ForegroundColor Green

# 1. Pull latest changes from the current directory
git pull

# 2. Check the exit code for success/failure
if ($LASTEXITCODE -eq 0) {
    Write-Host "Update complete! Launching the Email Builder..." -ForegroundColor Cyan
} else {
    Write-Host "Error during update. Launching existing version..." -ForegroundColor Yellow
}

# 3. Launch the HTML file in the default browser.
Start-Process ".\interface\html\index.html"

# Wait briefly before the window closes so the user can read the messages
Start-Sleep -Seconds 3