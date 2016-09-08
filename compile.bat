@ECHO off

REM Change the working disk
%~d0

REM Change the working directory
cd %~dp0

REM Compile typescript to javascript
tsc -out export/app.js app/fwords.ts
