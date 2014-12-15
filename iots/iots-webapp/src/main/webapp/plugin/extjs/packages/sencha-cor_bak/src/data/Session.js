Ext.define("Ext.data.Session",{requires:["Ext.data.schema.Schema","Ext.data.Batch","Ext.data.matrix.Matrix","Ext.data.session.ChangesVisitor","Ext.data.session.ChildChangesVisitor","Ext.data.session.BatchVisitor"],isSession:true,config:{schema:"default",parent:null,crudProperties:{create:"C",read:"R",update:"U",drop:"D"}},destroyed:false,crudOperations:[{type:"R",entityMethod:"readEntities"},{type:"C",entityMethod:"createEntities"},{type:"U",entityMethod:"updateEntities"},{type:"D",entityMethod:"dropEntities"}],crudKeys:{C:1,R:1,U:1,D:1},constructor:function(A){var B=this;B.data={};B.matrices={};B.identifierCache={};B.recordCreator=B.recordCreator.bind(B);B.initConfig(A)},destroy:function(){var D=this,E=D.matrices,G=D.data,F,B,A,C;for(C in E){E[C].destroy()}for(F in G){B=G[F];for(C in B){A=B[C].record;if(A){A.$source=A.session=null}}}D.recordCreator=D.matrices=D.data=null;D.setSchema(null);D.callParent()},adopt:function(A){this.checkModelType(A.self);if(A.session&&A.session!==this){Ext.Error.raise("Record already belongs to an existing session")}if(A.phantom){Ext.Error.raise("Phantom records cannot be adopted, use the createRecord method")}if(A.session!==this){A.session=this;this.add(A)}},commit:function(){},createRecord:function(A,E){this.checkModelType(A);var B=A.$isClass?A:this.getSchema().getEntity(A),D=this.getParent(),C;if(D){C=B.getIdFromData(E);if(D.peekRecord(B,C)){Ext.Error.raise("A parent session already contains an entry for "+B.entityName+": "+C)}}return new B(E,this)},getChanges:function(){var A=new Ext.data.session.ChangesVisitor(this);this.visitData(A);return A.result},getChangesForParent:function(){var A=new Ext.data.session.ChildChangesVisitor(this);this.visitData(A);return A.result},getRecord:function(B,D,C){var E=this,F=E.peekRecord(B,D),G,H,A;if(!F){G=B.$isClass?B:E.getSchema().getEntity(B);H=E.getParent();if(H){A=H.peekRecord(G,D)}if(A&&!A.isLoading()){F=A.copy(undefined,E);F.$source=A}else{F=G.createWithId(D,null,E);if(C!==false){F.load(Ext.isObject(C)?C:undefined)}}}return F},getSaveBatch:function(A){var B=new Ext.data.session.BatchVisitor();this.visitData(B);return B.getBatch(A)},onInvalidAssociationEntity:function(A,B){Ext.Error.raise("Unable to read association entity: "+this.getModelIdentifier(A,B))},onInvalidEntityCreate:function(A,B){Ext.Error.raise("Cannot create, record already not exists: "+this.getModelIdentifier(A,B))},onInvalidEntityDrop:function(A,B){Ext.Error.raise("Cannot drop, record does not exist: "+this.getModelIdentifier(A,B))},onInvalidEntityRead:function(A,B){Ext.Error.raise("Cannot read, record already not exists: "+this.getModelIdentifier(A,B))},onInvalidEntityUpdate:function(A,C,B){if(B){Ext.Error.raise("Cannot update, record dropped: "+this.getModelIdentifier(A,C))}else{Ext.Error.raise("Cannot update, record does not exist: "+this.getModelIdentifier(A,C))}},peekRecord:function(C,F,G){this.checkModelType(C);var E=C.$isClass?C:this.getSchema().getEntity(C),A=E.entityName,B=this.data[A],H,D;B=B&&B[F];H=B&&B.record;if(!H&&G){D=this.getParent();H=D&&D.peekRecord(C,F,G)}return H||null},save:function(){if(!this.getParent()){Ext.Error.raise("Cannot commit session, no parent exists")}var A=new Ext.data.session.ChildChangesVisitor(this);this.visitData(A);this.getParent().update(A.result)},spawn:function(){return new this.self({schema:this.getSchema(),parent:this})},update:function(D){var L=this,J=L.getSchema(),A=L.crudOperations,M=A.length,N=L.crudKeys,C,K,B,H,O,P,G,I,F,E;for(C in D){K=J.getEntity(C);if(!K){Ext.Error.raise("Invalid entity type: "+C)}B=D[C];for(H=0;H<M;++H){O=A[H];P=B[O.type];if(P){L[O.entityMethod](K,P)}}}for(C in D){K=J.getEntity(C);G=K.associations;B=D[C];for(I in B){if(N[I]){continue}F=G[I];if(!F){Ext.Error.raise("Invalid association key for "+C+', "'+I+'"')}E=B[F.role];F.processUpdate(L,E)}}},privates:{add:function(H){var G=this,F=H.id,A=G.matrices,C=G.getEntry(H.self,F),B,E,D;if(C.record){Ext.Error.raise("Duplicate id "+H.id+" for "+H.entityName)}C.record=H;G.registerReferences(H);B=H.associations;for(E in B){D=B[E];association=D.association;matrix=A[association.name];if(association.isManyToMany&&matrix){D.checkMembership(G,H,matrix)}}},applySchema:function(A){return Ext.data.schema.Schema.get(A)},checkModelType:function(A){if(A.$isClass){A=A.entityName}if(!A){Ext.Error.raise("Unable to use anonymous models in a Session")}else{if(!this.getSchema().getEntity(A)){Ext.Error.raise("Unknown entity type "+A)}}},createEntities:function(C,F){var E=F.length,B,G,A,D;for(B=0;B<E;++B){G=F[B];D=C.getIdFromData(G);A=this.peekRecord(C,D);if(!A){A=this.createRecord(C,G)}else{this.onInvalidEntityCreate(C,D)}A.phantom=true}},dropEntities:function(C,E){var D=E.length,B,A,F;for(B=0;B<D;++B){F=E[B];A=this.peekRecord(C,F);if(A){A.drop()}else{this.onInvalidEntityDrop(C,F)}}},getEntityList:function(C,F){var E=F.length,B,G,A,D;for(B=0;B<E;++B){G=F[B];A=this.peekRecord(C,G);if(A){F[B]=A}else{D=true;F[B]=null;this.onInvalidAssociationEntity(C,G)}}if(D){F=Ext.Array.clean(F)}return F},getEntry:function(A,F){var B=A.$isClass?A:this.getSchema().getEntity(A),D=B.entityName,C=this.data,E;E=C[D]||(C[D]={});E=E[F]||(E[F]={});return E},getIdentifier:function(C){var B=this.identifierCache,D=C.identifier,A=D.id||C.entityName,E=B[A];if(!E){if(D.clone){E=D.clone({cache:B})}else{E=D}B[A]=E}return E},getMatrix:function(A){var B=A.isManyToMany?A.name:A,C=this.matrices;return C[B]||(C[B]=new Ext.data.matrix.Matrix(this,A))},getMatrixSlice:function(B,D){var A=this.getMatrix(B.association),C=A[B.side];return C.get(D)},getModelIdentifier:function(A,B){return B+"@"+A.entityName},onIdChanged:function(G,N,E){var F=this,Q=G.entityName,O=G.id,H=F.data[Q],C=H[N],P=G.associations,R=C.refs,S=F._setNoRefs,A,D,I,J,M,K,B,L;if(H[E]){Ext.Error.raise("Cannot change "+Q+" id from "+N+" to "+E+" id already exists")}delete H[N];H[E]=C;for(K in P){M=P[K];if(M.isMany){L=M.getAssociatedItem(G);if(L){I=L.matrix;if(I){I.changeId(E)}}}}if(R){for(K in R){B=R[K];M=P[K];A=M.association;if(A.isManyToMany){}else{D=A.field.name;for(J in B){B[J].set(D,O,S)}}}}F.registerReferences(G,N)},processManyBlock:function(D,B,H,C){var F=this,E,G,A;if(H){for(E in H){G=F.peekRecord(D,E);if(G){records=F.getEntityList(B.cls,H[E]);A=B.getAssociatedItem(G);F[C](B,A,G,records)}else{F.onInvalidAssociationEntity(D,E)}}}},processManyCreate:function(C,A,D,B){if(A){A.add(B)}else{D[C.getterName](null,null,B)}},processManyDrop:function(C,A,D,B){if(A){A.remove(B)}},processManyRead:function(C,A,D,B){if(A){A.setRecords(B)}else{D[C.getterName](null,null,B)}},readEntities:function(C,F){var E=F.length,B,G,A,D;for(B=0;B<E;++B){G=F[B];D=C.getIdFromData(G);A=this.peekRecord(C,D);if(!A){A=this.createRecord(C,G)}else{this.onInvalidEntityRead(C,D)}A.phantom=false}},recordCreator:function(E,A){var B=this,C=A.getIdFromData(E),D=B.peekRecord(A,C,true);if(!D){D=new A(E,B)}else{D=B.getRecord(A,C)}return D},registerReferences:function(L,M){var A=L.entityName,I=L.id,F=L.data,G=M||M===0,C,H,J,K,B,D,N,E;K=(D=L.references).length;for(H=0;H<K;++H){B=D[H];J=F[B.name];if(J||J===0){B=B.reference;A=B.type;E=B.inverse.role;C=this.getEntry(B.cls,J);N=C.refs||(C.refs={});N=N[E]||(N[E]={});N[I]=L;if(G){delete N[M]}}}},updateEntities:function(E,H){var G=H.length,D,C,B,F,A;if(Ext.isArray(H)){for(D=0;D<G;++D){C=H[D];F=E.getIdFromData(C);B=this.peekRecord(E,F);if(B){B.set(C)}else{this.onInvalidEntityUpdate(E,F)}}}else{for(F in H){C=H[F];B=this.peekRecord(E,F);if(B&&!B.dropped){A=B.set(C)}else{this.onInvalidEntityUpdate(E,F,!!B)}}}},updateReference:function(I,F,C,H){var B=F.reference,A=B.type,D=B.inverse.role,G=I.id,J,E;if(H||H===0){E=this.getEntry(A,H).refs[D];delete E[G]}if(C||C===0){J=this.getEntry(A,C);E=J.refs||(J.refs={});E=E[D]||(E[D]={});E[G]=I}},visitData:function(N){var L=this,D=L.data,B=L.matrices,E,F,K,C,H,I,M,J,A,G,O;for(M in D){E=D[M];for(K in E){J=E[K].record;if(J){if(J.phantom||J.dirty||J.dropped){if(N.onDirtyRecord){N.onDirtyRecord(J)}}else{if(N.onCleanRecord){N.onCleanRecord(J)}}}}}if(N.onMatrixChange){for(M in B){H=B[M].left;G=H.slices;F=H.role.association;for(K in G){A=G[K];I=A.members;for(C in I){O=(J=I[C])[2];if(O){N.onMatrixChange(F,J[0],J[1],O)}}}}}return N},_setNoRefs:{refs:false}}});