myApp.controller("formCtrl", ['$scope',
  function($scope) {
    $scope.html = "";
  }
]);

myApp.config(function($provide){
  $provide.decorator('taOptions', ['taRegisterTool', '$delegate', '$uibModal', function (taRegisterTool, taOptions, $uibModal) {
    // $delegate is the taOptions we are decorating
    // register the tool with textAngular
    taRegisterTool('fontColor', {
        display:"<spectrum-colorpicker trigger-id='{{trigger}}' ng-model='color' on-change='!!color && action(color)' format='\"hex\"' options='options'></spectrum-colorpicker>",
        action: function (color) {
            var me = this;
            if (!this.$editor().wrapSelection) {
                setTimeout(function () {
                    me.action(color);
                }, 100)
            } else {
                return this.$editor().wrapSelection('foreColor', color);
            }
        },
        options: {
            replacerClassName: 'fa fa-font', showButtons: false
        },
        color: "#000"
    });

    taRegisterTool('uploadImage', {
      iconclass: "fa fa-image",
      action: function (deferred) {
        $uibModal.open({
          controller: 'imgUpload',
          templateUrl: 'views/modals/upload.html'
        }).result.then(
          function (result) {
            document.execCommand('insertImage', true, result);
            deferred.resolve();
          },
          function () {
            deferred.resolve();
          }
        );
        return false;
      }
    });
    
    // 에디터 툴바 버튼 생성
    taOptions.toolbar = [
      ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'pre'],
      ['bold', 'italics', 'underline', 'strikeThrough', 'ul'],
      ['justifyLeft', 'justifyCenter', 'justifyRight', 'indent', 'outdent'],
      []
    ];
      
    taOptions.toolbar[1].push('fontColor');
    taOptions.toolbar[3].push('uploadImage');
    taOptions.toolbar[3].push('insertLink');
    taOptions.toolbar[3].push('wordcount');
    taOptions.toolbar[3].push('charcount');
    
    return taOptions;
  }]);
});