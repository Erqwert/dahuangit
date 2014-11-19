package com.dahuangit.util.spring;

import java.text.SimpleDateFormat;
import java.util.Date;

import org.springframework.beans.propertyeditors.CustomDateEditor;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.support.WebBindingInitializer;
import org.springframework.web.context.request.WebRequest;

/**
 * pring3 mvc 的日期传递[前台-后台] 的解决方式.包括xml的配置
 */
public class SpringDateConverter implements WebBindingInitializer {

	@Override
	public void initBinder(WebDataBinder binder, WebRequest request) {
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		binder.registerCustomEditor(Date.class, new CustomDateEditor(df, true));
	}

}