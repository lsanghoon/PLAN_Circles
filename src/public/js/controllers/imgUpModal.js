myApp.controller('imgUpload', ['$scope', 'Upload', '$timeout', '$uibModalInstance', function ($scope, Upload, $timeout, $uibModalInstance) {
  $scope.image = 'img/eun.png';
  
  $scope.uploadImg = function(file, errFiles) {  
    $scope.f = file;
    $scope.errFile = errFiles && errFiles[0];
    
    // 파일 존재하면 바로 서버로 업로드
    if (file) {      
      file.upload = Upload.upload({
        url: '/imgUpload',
        method:'POST',
        data: {file:file}
      }).success(function (data, status, headers, config) {
        // 업로드가 끝나면 이미지 미리보기
        $scope.image = 'img/content/' + data.filename;
      });
      
      file.upload.then(function (response) {
        $timeout(function () {
          file.result = response.data;
        });
      }, function (response) {
        if (response.status > 0)
            $scope.errorMsg = 'Error! ' + response.status;
      }, function (evt) {
        file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total)); 
      });
    }  // if -- end
  }   // uploadFiles -- end

  $scope.insert = function(){
    $uibModalInstance.close($scope.image);
  };
}]);