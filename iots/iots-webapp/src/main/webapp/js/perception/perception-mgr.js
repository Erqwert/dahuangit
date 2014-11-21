Ext.require('Ext.grid.*');
Ext.require('Ext.data.*');
Ext.require('Ext.panel.*');
Ext.require('Ext.layout.container.Border');
Ext.require('Ext.toolbar.Toolbar');
Ext.require('Ext.PagingToolbar');

Ext.onReady(function() {

			var store = Ext.create('Ext.data.Store', {
						fields : ['createDateTime', 'lastCommTime', 'installSite', 'lastModifyTime', 'perceptionAddr',
								'perceptionName', 'perceptionTypeId', 'perceptionTypeName', 'perceptionId'],

						proxy : {
							type : 'ajax',
							url : 'spring/perception/findPerceptionByPage',

							// 将提交方式改为post
							actionMethods : {
								read : 'POST'
							},

							reader : {
								type : 'json',
								rootProperty : 'results',
								totalProperty : 'totalCount'
							}
						}
					});

			var pg = Ext.create('Ext.PagingToolbar', {
						store : store,
						pageSize : 25,
						displayInfo : true,
						displayMsg : '显示{0}-{1}条，共{2}条',
						emptyMsg : "没有数据"
					});

			var grid = Ext.create('Ext.grid.Panel', {
						title : '感知端设备列表',
						renderTo : Ext.getBody(),
						store : store,
						columns : [{
									xtype : 'rownumberer'
								}, {
									text : "设备地址",
									width : 30,
									dataIndex : 'perceptionAddr',
									sortable : true
								}, {
									text : "设备名称",
									width : 30,
									dataIndex : 'perceptionName',
									sortable : true
								}, {
									text : "安装地点",
									width : 60,
									dataIndex : 'installSite',
									sortable : true
								}, {
									text : "设备接入时间",
									width : 30,
									dataIndex : 'createDateTime',
									sortable : true
								}, {
									text : "最后通信时间",
									width : 30,
									dataIndex : 'lastCommTime',
									sortable : true
								}, {
									text : "操作",
									width : 60,
									dataIndex : 'perceptionId',
									renderer : function(value, record) {
										return '<span href="#" onclick="javascript:showPerceptionDetailwin(\'' + value
												+ '\')">查看详情</span>';
									}
								}],
						bbar : pg,
						forceFit : true,
						height : 600,
						split : true
					});

			store.load({
						params : {
							start : 0,
							limit : 25
						}
					});

		});
