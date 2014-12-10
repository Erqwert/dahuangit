Ext.define("Ext.grid.feature.Grouping",{extend:"Ext.grid.feature.Feature",mixins:{summary:"Ext.grid.feature.AbstractSummary"},requires:["Ext.grid.feature.GroupStore"],alias:"feature.grouping",eventPrefix:"group",groupCls:Ext.baseCSSPrefix+"grid-group-hd",eventSelector:"."+Ext.baseCSSPrefix+"grid-group-hd",refreshData:{},groupInfo:{},wrapsItem:true,groupHeaderTpl:"{columnName}: {name}",depthToIndent:17,collapsedCls:Ext.baseCSSPrefix+"grid-group-collapsed",hdCollapsedCls:Ext.baseCSSPrefix+"grid-group-hd-collapsed",hdNotCollapsibleCls:Ext.baseCSSPrefix+"grid-group-hd-not-collapsible",collapsibleCls:Ext.baseCSSPrefix+"grid-group-hd-collapsible",ctCls:Ext.baseCSSPrefix+"group-hd-container",groupByText:"Group by this field",showGroupsText:"Show in groups",hideGroupedHeader:false,startCollapsed:false,enableGroupingMenu:true,enableNoGroups:true,collapsible:true,expandTip:"Click to expand. CTRL key collapses all others",collapseTip:"Click to collapse. CTRL/click collapses all others",showSummaryRow:false,outerTpl:["{%","if (!(this.groupingFeature.disabled || values.rows.length === 1 && values.rows[0].isSummary)) {","this.groupingFeature.setup(values.rows, values.view.rowValues);","}","this.nextTpl.applyOut(values, out, parent);","if (!(this.groupingFeature.disabled || values.rows.length === 1 && values.rows[0].isSummary)) {","this.groupingFeature.cleanup(values.rows, values.view.rowValues);","}","%}",{priority:200}],groupRowTpl:["{%","var me = this.groupingFeature,",'colspan = "colspan=" + values.columns.length;',"if (me.disabled || parent.rows.length === 1 && parent.rows[0].isSummary) {","values.needsWrap = false;","} else {","me.setupRowData(values.record, values.rowIndex, values);","}","%}",'<tpl if="needsWrap">','<tpl if="isFirstRow">',"{% values.view.renderColumnSizer(values, out); %}",'<tr data-boundView="{view.id}" data-recordId="{record.internalId:htmlEncode}" data-recordIndex="{[values.isCollapsedGroup ? -1 : values.recordIndex]}" class="{groupHeaderCls}">','<td class="{[me.ctCls]}" {[colspan]}>',"{%",'var groupTitleStyle = (!values.view.lockingPartner || (values.view.ownerCt === values.view.ownerCt.ownerLockable.lockedGrid) || (values.view.lockingPartner.headerCt.getVisibleGridColumns().length === 0)) ? "" : "visibility:hidden";',"%}",'<div id="{groupId}" class="',Ext.baseCSSPrefix,'grid-group-hd {collapsibleCls}" tabIndex="0" hidefocus="on" {ariaCellInnerAttr}>','<div class="',Ext.baseCSSPrefix,'grid-group-title" style="{[groupTitleStyle]}" {ariaGroupTitleAttr}>','{[values.groupHeaderTpl.apply(values.groupInfo, parent) || "&#160;"]}',"</div>","</div>","</td>","</tr>","</tpl>",'<tpl if="!isCollapsedGroup">',"{%","values.itemClasses.length = 0;","this.nextTpl.applyOut(values, out, parent);","%}","</tpl>",'<tpl if="summaryRecord">',"{%me.outputSummaryRecord(values.summaryRecord, values, out, parent);%}","</tpl>","<tpl else>","{%this.nextTpl.applyOut(values, out, parent);%}","</tpl>",{priority:200,syncRowHeights:function(A,B){A=Ext.fly(A,"syncDest");B=Ext.fly(B,"sycSrc");var C=this.owner,G=A.down(C.eventSelector,true),H,F=A.down(C.summaryRowSelector,true),D,E,I;if(G&&(H=B.down(C.eventSelector,true))){G.style.height=H.style.height="";if((E=G.offsetHeight)>(I=H.offsetHeight)){Ext.fly(H).setHeight(E)}else{if(I>E){Ext.fly(G).setHeight(I)}}}if(F&&(D=B.down(C.summaryRowSelector,true))){F.style.height=D.style.height="";if((E=F.offsetHeight)>(I=D.offsetHeight)){Ext.fly(D).setHeight(E)}else{if(I>E){Ext.fly(F).setHeight(I)}}}},syncContent:function(A,G,F){A=Ext.fly(A,"syncDest");G=Ext.fly(G,"sycSrc");var B=this.owner,H=A.down(B.eventSelector,true),E=G.down(B.eventSelector,true),C=A.down(B.summaryRowSelector,true),D=G.down(B.summaryRowSelector,true);if(H&&E){Ext.fly(H).syncContent(E)}if(C&&D){if(F){this.groupingFeature.view.updateColumns(C,D,F)}else{Ext.fly(C).syncContent(D)}}}}],constructor:function(){this.groupCache={};this.callParent(arguments)},init:function(E){var B=this,D=B.view,A=D.getStore(),C;D.isGrouping=!!A.getGrouper();if(B.lockingPartner&&B.lockingPartner.groupCache){B.groupCache=B.lockingPartner.groupCache}B.mixins.summary.init.call(B);B.callParent(arguments);D.headerCt.on({columnhide:B.onColumnHideShow,columnshow:B.onColumnHideShow,columnmove:B.onColumnMove,scope:B});D.addTpl(Ext.XTemplate.getTpl(B,"outerTpl")).groupingFeature=B;D.addRowTpl(Ext.XTemplate.getTpl(B,"groupRowTpl")).groupingFeature=B;D.preserveScrollOnRefresh=true;if(A.isBufferedStore){B.collapsible=false}else{C=B.lockingPartner;if(C&&C.dataSource){B.dataSource=D.dataSource=C.dataSource}else{B.dataSource=D.dataSource=new Ext.grid.feature.GroupStore(B,A)}}E=E.ownerLockable||E;E.on({reconfigure:B.onReconfigure,scope:B});D.on({afterrender:B.afterViewRender,scope:B,single:true});B.storeListeners=D.store.on({groupchange:B.onGroupChange,scope:B,destroyable:true})},indexOf:function(A){return this.dataSource.indexOf(A)},isInCollapsedGroup:function(C){var B,A=this.view.getStore();if(A.isGrouped()&&(B=this.getGroup(C))){return B.isCollapsed||false}return false},clearGroupCache:function(){var A=this,B=A.groupCache={};if(A.lockingPartner){A.lockingPartner.groupCache=B}return B},vetoEvent:function(D,C,A,B){if(B.type!=="mouseover"&&B.type!=="mouseout"&&B.type!=="mouseenter"&&B.type!=="mouseleave"&&B.getTarget(this.eventSelector)){return false}},enable:function(){var C=this,D=C.view,A=D.getStore(),B;D.isGrouping=true;C.callParent();if(C.lastGrouper){A.group(C.lastGrouper);C.lastGrouper=null}B=C.view.headerCt.getMenu().down("#groupToggleMenuItem");if(B){B.setChecked(true,true)}},disable:function(){var D=this,E=D.view,B=E.getStore(),C,A=B.getGrouper();E.isGrouping=false;D.callParent();if(A){D.lastGrouper=A;B.clearGrouping()}C=D.view.headerCt.getMenu().down("#groupToggleMenuItem");if(C){C.setChecked(false,true)}},afterViewRender:function(){var A=this,B=A.view;B.on({scope:A,groupclick:A.onGroupClick});if(A.enableGroupingMenu){A.injectGroupingMenu()}A.pruneGroupedHeader();A.lastGrouper=A.view.getStore().getGrouper();if(A.disabled){A.disable()}},injectGroupingMenu:function(){var A=this,B=A.view.headerCt;B.showMenuBy=A.showMenuBy;B.getMenuItems=A.getMenuItems()},onColumnHideShow:function(E,K){var A=this.view,L=A.headerCt,G=L.getMenu(),D=G.activeHeader,B=G.down("#groupMenuItem"),I,J=this.grid.getVisibleColumnManager().getColumns().length,C,H,F;if(D&&B){I=D.groupable===false||D.dataIndex==null||this.view.headerCt.getVisibleGridColumns().length<2?"disable":"enable";B[I]()}if(A.rendered){C=A.el.query("."+this.ctCls);for(F=0,H=C.length;F<H;++F){C[F].colSpan=J}}},onColumnMove:function(){var D=this,B=D.view.getStore(),C,A,F,E,G;if(B.isGrouped()){C=D.groupCache;Ext.suspendLayouts();for(A in C){if(C.hasOwnProperty(A)){F=C[A];E=F.items[0];G=F.items[F.items.length-1];B.fireEvent("update",B,E,"edit",null);if(G!==E&&D.showSummaryRow){B.fireEvent("update",B,G,"edit",null)}}}Ext.resumeLayouts(true)}},showMenuBy:function(E,D){var G=this.getMenu(),F=G.down("#groupMenuItem"),B=D.groupable===false||D.dataIndex==null||this.view.headerCt.getVisibleGridColumns().length<2?"disable":"enable",A=G.down("#groupToggleMenuItem"),C=this.view.store.isGrouped();F[B]();if(A){A.setChecked(C,true);A[C?"enable":"disable"]()}Ext.grid.header.Container.prototype.showMenuBy.apply(this,arguments)},getMenuItems:function(){var C=this,D=C.groupByText,E=C.disabled||!C.getGroupField(),A=C.showGroupsText,B=C.enableNoGroups,F=C.view.headerCt.getMenuItems;return function(){var G=F.call(this);G.push("-",{iconCls:Ext.baseCSSPrefix+"group-by-icon",itemId:"groupMenuItem",text:D,handler:C.onGroupMenuItemClick,scope:C});if(B){G.push({itemId:"groupToggleMenuItem",text:A,checked:!E,checkHandler:C.onGroupToggleMenuItemClick,scope:C})}return G}},onGroupMenuItemClick:function(G,C){var D=this,A=G.parentMenu,E=A.activeHeader,F=D.view,B=F.store;if(D.disabled){D.lastGrouper=null;D.block();D.enable();D.unblock()}B.group(E.dataIndex);D.pruneGroupedHeader()},block:function(A){this.blockRefresh=this.view.blockRefresh=true;if(this.lockingPartner&&!A){this.lockingPartner.block(true)}},unblock:function(A){this.blockRefresh=this.view.blockRefresh=false;if(this.lockingPartner&&!A){this.lockingPartner.unblock(true)}},onGroupToggleMenuItemClick:function(B,A){this[A?"enable":"disable"]()},pruneGroupedHeader:function(){var B=this,A=B.getGroupedHeader();if(B.hideGroupedHeader&&A){Ext.suspendLayouts();if(B.prunedHeader&&B.prunedHeader!==A){B.prunedHeader.show()}B.prunedHeader=A;if(A.rendered){A.hide()}Ext.resumeLayouts(true)}},getHeaderNode:function(A){return document.getElementById(this.createGroupId(A))},getGroup:function(C){if(C.isModel){C=C.get(this.view.getStore().getGroupField())}var A=this.groupCache,B=A[C];if(!B){B=A[C]={isCollapsed:false}}return B},isExpanded:function(A){return !this.getGroup(A).isCollapsed},expand:function(A,B){this.doCollapseExpand(false,A,B)},expandAll:function(){var B=this,D=B.groupCache,A,C=B.lockingPartner;for(A in D){if(D.hasOwnProperty(A)){D[A].isCollapsed=false}}Ext.suspendLayouts();B.dataSource.onRefresh();Ext.resumeLayouts(true);for(A in D){if(D.hasOwnProperty(A)){B.afterCollapseExpand(false,A);if(C){C.afterCollapseExpand(false,A)}}}},collapse:function(A,B){this.doCollapseExpand(true,A,B)},isAllCollapsed:function(){var B=this,C=B.groupCache,A;for(A in C){if(C.hasOwnProperty(A)){if(!C[A].isCollapsed){return false}}}return true},isAllExpanded:function(){var B=this,C=B.groupCache,A;for(A in C){if(C.hasOwnProperty(A)){if(C[A].isCollapsed){return false}}}return true},collapseAll:function(){var B=this,D=B.groupCache,A,C=B.lockingPartner;for(A in D){if(D.hasOwnProperty(A)){D[A].isCollapsed=true}}Ext.suspendLayouts();B.dataSource.onRefresh();if(C&&!C.isAllCollapsed()){C.collapseAll()}Ext.resumeLayouts(true);for(A in D){if(D.hasOwnProperty(A)){B.afterCollapseExpand(true,A);if(C){C.afterCollapseExpand(true,A)}}}},doCollapseExpand:function(A,D,C){var B=this,F=B.lockingPartner,E=B.groupCache[D];if(E.isCollapsed!==A){Ext.suspendLayouts();if(A){B.dataSource.collapseGroup(E)}else{B.dataSource.expandGroup(E)}Ext.resumeLayouts(true);B.afterCollapseExpand(A,D,C);if(F){F.afterCollapseExpand(A,D,false)}}},afterCollapseExpand:function(A,E,C){var B=this,F=B.view,D;D=B.getHeaderNode(E);F.fireEvent(A?"groupcollapse":"groupexpand",F,D,E);if(C){F.scrollElIntoView(Ext.fly(D).up(F.getItemSelector()),false,true)}},onGroupChange:function(B,E){var C=this,D=C.grid.ownerCt,A=C.view;if(!E){if(D&&D.lockable){D.view.refresh()}else{A.refresh()}}else{C.lastGrouper=E}},getMenuItem:function(A){var B=this.view,C=B.headerCt.down("gridcolumn[dataIndex="+A+"]"),D=B.headerCt.getMenu();return C?D.down("menuitem[headerId="+C.id+"]"):null},onGroupKey:function(C,D){var B=this,A=B.getGroupName(D.target);if(A){B.onGroupClick(B.view,D.target,A,D)}},onGroupClick:function(A,H,D,C){var F=this,E=F.groupCache,B=!F.isExpanded(D),G;if(F.collapsible){if(C.ctrlKey){Ext.suspendLayouts();for(G in E){if(G===D){if(B){F.expand(D)}}else{if(!E[G].isCollapsed){F.doCollapseExpand(true,G,false)}}}Ext.resumeLayouts(true);return}if(B){F.expand(D)}else{F.collapse(D)}}},setupRowData:function(M,F,H){var K=this,G=H.recordIndex,D=K.refreshData,L=K.groupInfo,O=D.header,A=D.groupField,B=K.view.getStore(),P=K.view.dataSource,E,I,J,C,N;H.isCollapsedGroup=false;H.summaryRecord=H.groupHeaderCls=null;if(D.doGrouping){E=B.getGrouper();if(M.isCollapsedPlaceholder){I=E.getGroupString(M);N=B.getGroups().get(I).items;H.isFirstRow=H.isLastRow=true;H.groupHeaderCls=K.hdCollapsedCls;H.isCollapsedGroup=H.needsWrap=true;H.groupInfo=L;L.groupField=A;L.name=I;L.groupValue=N[0].get(A);L.columnName=O?O.text:A;H.collapsibleCls=K.collapsible?K.collapsibleCls:K.hdNotCollapsibleCls;H.groupId=K.createGroupId(I);L.rows=L.children=N;if(K.showSummaryRow){H.summaryRecord=D.summaryData[I]}return}I=E.getGroupString(M);if(M.group){N=M.group.items;H.isFirstRow=M===N[0];H.isLastRow=M===N[N.length-1]}else{H.isFirstRow=G===0;if(!H.isFirstRow){J=B.getAt(G-1);if(J){H.isFirstRow=!J.isEqual(E.getGroupString(J),I)}}H.isLastRow=G==(B.isBufferedStore?B.getTotalCount():B.getCount())-1;if(!H.isLastRow){C=B.getAt(G+1);if(C){H.isLastRow=!C.isEqual(E.getGroupString(C),I)}}}if(H.isFirstRow){L.groupField=A;L.name=I;L.groupValue=M.get(A);L.columnName=O?O.text:A;H.collapsibleCls=K.collapsible?K.collapsibleCls:K.hdNotCollapsibleCls;H.groupId=K.createGroupId(I);if(!K.isExpanded(I)){H.itemClasses.push(K.hdCollapsedCls);H.isCollapsedGroup=true}if(P.isBufferedStore){L.rows=L.children=[]}else{L.rows=L.children=K.getRecordGroup(M).items}H.groupInfo=L}if(H.isLastRow){if(K.showSummaryRow){H.summaryRecord=D.summaryData[I];H.itemClasses.push(Ext.baseCSSPrefix+"grid-group-last")}}H.needsWrap=(H.isFirstRow||H.summaryRecord)}},setup:function(D,B){var A=this,F=A.refreshData,E=B.view,C=!A.disabled&&E.isGrouping;A.skippedRows=0;if(E.bufferedRenderer){E.bufferedRenderer.variableRowHeight=E.bufferedRenderer.variableRowHeight||E.store.isGrouped()}F.groupField=A.getGroupField();F.header=A.getGroupedHeader(F.groupField);F.doGrouping=C;B.groupHeaderTpl=Ext.XTemplate.getTpl(A,"groupHeaderTpl");if(C&&A.showSummaryRow){F.summaryData=A.generateSummaryData()}},cleanup:function(B,A){var C=this.refreshData;A.groupInfo=A.groupHeaderTpl=A.isFirstRow=null;C.groupField=C.header=null},getGroupName:function(G){var E=this,A=E.view,D=E.eventSelector,B,F,C;F=Ext.fly(G).findParent(D);if(!F){C=Ext.fly(G).findParent(A.itemSelector);if(C){F=C.down(D,true)}}if(F){B=F.id.split(A.id+"-hd-");if(B.length===2){return Ext.htmlDecode(B[1])}}},getRecordGroup:function(A){var B=this.view.getStore().getGrouper();if(B){return this.groupCache[B.getGroupString(A)]}},createGroupId:function(A){return this.view.id+"-hd-"+Ext.htmlEncode(A)},createGroupCls:function(A){return this.view.id+"-"+Ext.htmlEncode(A)+"-item"},getGroupField:function(){return this.view.store.getGroupField()},getGroupedHeader:function(F){var C=this,D=C.view.headerCt,B=C.lockingPartner,E,A;F=F||this.getGroupField();if(F){E="[dataIndex="+F+"]";A=D.down(E);if(!A&&B){A=B.view.headerCt.down(E)}}return A||null},getFireEventArgs:function(A,C,D,B){return[A,C,D,this.getGroupName(D),B]},destroy:function(){var B=this,A=B.dataSource;B.view=B.prunedHeader=B.grid=B.groupCache=B.dataSource=null;B.callParent();if(A){A.bindStore(null)}},onReconfigure:function(I,B,D,F,J){var H=this,A=H.view,C=H.dataSource,G=I.lockable?I:null,E;if(B&&B!==F){E=B.isBufferedStore;H.storeListeners&&H.storeListeners.destroy();H.storeListeners=B.on({groupchange:H.onGroupChange,scope:H,destroyable:true});if(E!==F.isBufferedStore){Ext.Error.raise("Cannot reconfigure grouping switching between buffered and non-buffered stores")}A.isGrouping=!!B.getGrouper();C.bindStore(B);if(G){G.getView().bindStore(C,false,"dataSource")}else{A.refresh()}}}});