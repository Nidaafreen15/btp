
sap.ui.define([
    "sap/m/MessageToast"
], function (MessageToast) {
    'use strict';
    var iddd;
    var that = this;
    var extractedNumber;
    var extractedNumber2;

    return {
        onAfterItemAdded: function (oEvent) {86
            debugger;
            var baseUrl = oEvent.oSource.getModel().getServiceUrl();
            var item = oEvent.getParameter("item");
            var par_id = window.location.href;
            const regex = /ttuuid=([a-fA-F0-9-]+)/;
            const match = par_id.match(regex);
            if (match) {
                extractedNumber = match[1];
                console.log(extractedNumber); // Output: 1
            } else {
                console.log("Number not found in URL");
            }
            

            var _createEntity = async function (item) {
                var data = {
                    mediaType: item.getMediaType(),
                    fileName: item.getFileName(),
                    size: item.getFileObject().size,
                    fkey: extractedNumber,
                };
                debugger
              
                var settings = {
                    url: baseUrl+`Teacher(ttuuid=${extractedNumber},IsActiveEntity=false)/teatofile`,
                    method: "POST",
                    headers: {
                        "Content-type": "application/json"
                    },
                    data: JSON.stringify(data)
                };

                await new Promise((resolve, reject) => {
                    debugger
                    $.ajax(settings)
                        .done((results, textStatus, request) => {
                            debugger
                            iddd=results.id;
                            resolve(results);
                        })
                        .fail((err) => {
                            reject(err);
                        });
                });
            };

            _createEntity(item)
                .then((id) => {
                    debugger
                    var url = baseUrl+`Files(id=${iddd},IsActiveEntity=false)/content`;
                    iddd = null;
                    item.setUploadUrl(url);
                    item.setUrl(url)
                    var oUploadSet = this.byId("uploadSet");
                    oUploadSet.setHttpRequestMethod("PUT");
                    oUploadSet.uploadItem(item);
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        onOpenPressed: function (oEvent) {
            debugger
            var baseUrl = oEvent.oSource.getModel().getServiceUrl();
            var currentUrl = oEvent.oSource.mProperties.url;

            // Check if the currentUrl already contains baseUrl
            if (!currentUrl.startsWith(baseUrl)) {
                // If not, prepend baseUrl to the currentUrl
                let fileurl = baseUrl + currentUrl.substring(1);
                oEvent.oSource.mProperties.url = fileurl;
            }
            
            // let fileurl = baseUrl+oEvent.oSource.mProperties.url.substring(1);
            // let fileurl = oEvent.oSource.mProperties.url;
            // oEvent.oSource.mProperties.url = fileurl;
            // oEvent.oSource.setUploadUrl(fileurl)
        },

        onUploadCompleted: function (oEvent) {
            debugger
            var oUploadSet = this.byid("uploadSet");
            oUploadSet.removeAllIncompleteItems();
            
        },
        afterItemRemoved: function (oEvent) {
            debugger
            var baseUrl = oEvent.oSource.getModel().getServiceUrl()
            debugger
            const regex = /^(.*?),IsActiveEntity=/;

let match = oEvent.mParameters.item.mProperties.url.match(regex);
let urll = match[1]+",IsActiveEntity=false)";
$.ajax({ 
    url:baseUrl+urll,
    method: "DELETE"
  
})
        },
       

 

        //formatters
        formatThumbnailUrl: function (mediaType) {
            debugger
            var iconUrl;
            switch (mediaType) {
                case "image/png":
                    iconUrl = "sap-icon://card";
                    break;
                case "text/plain":
                    iconUrl = "sap-icon://document-text";
                    break;
                case "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
                    iconUrl = "sap-icon://excel-Attach";
                    break;
                case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
                    iconUrl = "sap-icon://doc-Attach";
                    break;
                case "application/pdf":
                    iconUrl = "sap-icon://pdf-Attach";
                    break;
                default:
                    iconUrl = "sap-icon://Attach";
            }
            return iconUrl;
        }

    };
});
