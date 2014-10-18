ApplicationTemplate
===================

# 目的
-------

アプリの開発速度向上とwatnowの知識の蓄積のため

# 使用条件
----------

- [generator-marionette](https://github.com/mrichard/generator-marionette#install)を使える環境があること

# 使用方法
-----------

GitLabからCloneする

     $clone git AppName ssh://git@gitlab.watnow.jp:22022/watnow/applicationtemplate.git

Gitのリモートリポジトリをプロジェクトのものに変更する([GitLab](http://gitlab.watnow.jp)で先にプロジェクトを作成しておく)

    $git remote set-url origin 'remote repository url'

Gruntなどプロジェクトに必要なパッケージをインストール

     $npm install

Bowerでライブラリを取得

    $bower install

プロジェクトに合わせて下記ファイルを変更

- bower.json
    - name
- www/config.xml
    - id
    - name
    - author
- scripts/modules/data_manager.js
    - DBName
- .cordova/config.json
    - id(libの方)