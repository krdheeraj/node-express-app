!function(){"use strict";nodeApp.controller("tableController",["$rootScope",function(a){var b=this;b.showTable=!0,b.popupData={},b.pageSize="50",b.pageNumber="1",b.changeValue=function(){a.$emit("changeValue")},b.closePopup=function(){$(".table-popup").remove()}}])}();