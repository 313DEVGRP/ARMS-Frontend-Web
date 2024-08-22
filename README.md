# Java-Service-Tree-Framework-Frontend-Web

## Installation

프로젝트를 설정하려면 다음 명령을 실행하세요.

```shell
npm install --save-dev --force grunt-cli grunt grunt-contrib-concat grunt-serve grunt-contrib-less grunt-contrib-watch grunt-contrib-uglify grunt-includes grunt-image grunt-contrib-jshint grunt-jscs grunt-contrib-clean grunt-contrib-csslint grunt-bootlint grunt-notify grunt-text-replace grunt-contrib-connect grunt-connect-proxy serve-static grunt-contrib-compass --save-exact prettier
```

## Required Packages
이 프로젝트는 다음 패키지를 필요로 합니다.
```text
grunt-cli
grunt
grunt-contrib-concat
grunt-serve
grunt-contrib-less
grunt-contrib-watch
grunt-contrib-uglify
grunt-includes
grunt-image
grunt-contrib-jshint
grunt-jscs
grunt-contrib-clean
grunt-contrib-csslint
grunt-bootlint
grunt-notify
grunt-text-replace
grunt-contrib-connect
grunt-connect-proxy
serve-static
grunt-contrib-compass
prettier
```

윈도우 경우 : 커맨드 실행 ( 관리자 권한으로 실행 )
Set-ExecutionPolicy RemoteSigned  -> Y

계정이 admin 이 아닌 경우 notfound ( grunt ) 일 가능성이 있습니다.
이 경우는 아래와 같은 명령어를 실행 후 grunt server 를 하세요

```shell
npm install -g --save-dev --force grunt-cli grunt grunt-contrib-concat grunt-serve grunt-contrib-less grunt-contrib-watch grunt-contrib-uglify grunt-includes grunt-image grunt-contrib-jshint grunt-jscs grunt-contrib-clean grunt-contrib-csslint grunt-bootlint grunt-notify grunt-text-replace grunt-contrib-connect grunt-connect-proxy serve-static grunt-contrib-compass --save-exact prettier
```

MAC 에서 nodejs 가 버전이 높은 경우는 아래 명령어 실행
```shell
npm install -g --save-dev --force grunt-cli grunt grunt-contrib-concat grunt-serve grunt-contrib-less grunt-contrib-watch grunt-contrib-uglify grunt-includes grunt-contrib-jshint grunt-jscs grunt-contrib-clean grunt-contrib-csslint grunt-bootlint grunt-notify grunt-text-replace grunt-contrib-connect grunt-connect-proxy serve-static grunt-contrib-compass --save-exact prettier
```