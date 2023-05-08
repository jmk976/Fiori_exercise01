sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/ui/core/Fragment",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, MessageToast, Fragment, JSONModel, Filter, FilterOperator) {
        "use strict";

        return Controller.extend("project1.controller.View1", {
            onInit: function () {
                var oModel = new JSONModel({
                    ValueHelpData : [
                        { Name : "목록1", Desc : "설명1"},
                        { Name : "목록2", Desc : "설명2"},
                        { Name : "목록3", Desc : "설명3"},
                    ]

                } )
                var oView = this.getView();
                oView.setModel(oModel, "view");

            },
            onInputChange: function (oEvent) {
                var sValue = oEvent.getParameter("value");
                MessageToast.show(sValue);

            },
            onSubmit: function(oEvent) {
                var sValue = oEvent.getParameter("value");
                MessageToast.show(sValue);

            },
             onLiveChange: function(oEvent) {
                var sValue = oEvent.getParameter("value"),
                    bEsc = oEvent.getParameter("escPressed"),//이벤트 초기화한건지 지운건지 알수 있음
                    sPrevious = oEvent.getParameter("previousValue");
                    MessageToast.show(sValue  + "\n" + bEsc + "\n" + sPrevious);

            },
            onLiveChange2: function(oEvent) {
                //입력한 비밀번호 길이가 10자리 미만일 경우 메세지 토스트로 알려주기
                // .length
                var sValue = oEvent.getParameter("value"),
                      sLen = sValue.length;

                var oInput = oEvent.getSource();

                if ( sLen < 10) {
                   // MessageToast.show("비밀번호는 10자리 이상으로 설정해야합니다.");
                   oInput.setValueState("Error");
                   oInput.setValueStateText("비밀번호는 10자리 이상으로 설정해야합니다.");
                } else {
                    oInput.setValueState();
                   // MessageToast.show("10자리 이상임");
                }
            },
            handleValueHelp : function (oEvent) {
                var oView = this.getView();
                this._oInput = oEvent.getSource();
        
                // create value help dialog
                if (!this._pValueHelpDialog) {
                    this._pValueHelpDialog = Fragment.load({
                        id: oView.getId(),
                        name: "project1.view.Dialog",
                        controller: this
                    }).then(function(oValueHelpDialog){
                        oView.addDependent(oValueHelpDialog);
                        return oValueHelpDialog;
                    });
                }
        
                // open value help dialog
                this._pValueHelpDialog.then(function(oValueHelpDialog){
                    oValueHelpDialog.open();
                });
            },

            _handleValueHelpSearch : function (oEvent) {
                var sValue = oEvent.getParameter("value");
                var oFilter = new Filter(
                    "Name",
                    FilterOperator.Contains, sValue
                );
                oEvent.getSource().getBinding("items").filter([oFilter]);
            },
        
            _handleValueHelpClose : function (oEvent) {
                var oSelectedItem = oEvent.getParameter("selectedItem");
                if (oSelectedItem) {
                    var oInput = this._oInput;
                    oInput.setValue(oSelectedItem.getTitle());
                }
                oEvent.getSource().getBinding("items").filter([]);
            }

        });
    });
