//开发版
// const domain = "http://shengxi.iyunfish.com/";
//测试版
const domain = "http://shengxi-test.iyunfish.com/";

import axios from 'axios'
const interfaces = {

//获取用户信息
getuserInfo(){
	return axios.get( domain + "index.php?m=api&c=pagehome&a=getwx_user")
	.then(function (response) {
		return response.data.data
	  
	})
	.catch(function (error) {
	return error
	});
  },  

// 品牌故事首次展示
getbrandFirst(id){
	return axios.get( domain + `index.php?m=api&c=project&a=show_project_story&id=${id}`)
	.then(function (response) {
		return response.data.data
	  
	})
	.catch(function (error) {
	return error
	});
  },  

//  客户修改表单信息

editForm(id){
	return axios.get( domain + `index.php?m=api&c=pagebook&a=edit_book&id=${id}`)
	.then(function (response) {
		return response.data
	})
	.catch(function (error) {
	return error
	});
  
}, 
  
//   取消订单
deleteForms(data){
	return axios.post( domain + `index.php?m=api&c=pagebook&a=cancel_book`,data)
	.then(function (response) {
	  return response.data
	})
	.catch(function (error) {
	return error
	});
  }, 


//   首页数据
	getData(){
		return axios.get( domain + "index.php?m=api&c=pagehome")
		.then(function (response) {
		  return response.data.data
		})
		.catch(function (error) {
		return error
		});
	  },

	//   获取所有城市
	getAllcity(){
		return axios.get( domain + "index.php?m=api&c=pagehome&a=getpro")
		.then(function (response) {
		  return response.data.data
		})
		.catch(function (error) {
		return error
		});
	  },

	  	//   获取所有城市经纬度
	getCode(id){
		return axios.get( domain + `index.php?m=api&c=pagehome&a=project_listbypro&province=${id}`)
		.then(function (response) {
		  return response.data.data
		})
		.catch(function (error) {
		return error
		});
	  },
	//   搜索手机号
	getphone(type,num){
		return axios.get( domain + `index.php?m=api&c=feedback&a=yuyue_list&type=${type}&mobile=${num}`)
		.then(function (response) {
		  return response.data.data
		})
		.catch(function (error) {
		return error
		});

	},

	//   新闻列表
	  newsList(){
		return axios.get( domain + "index.php?m=api&c=pagecenter&a=news_list&page=1")
		.then(function (response) {
		  return response.data.data
		})
		.catch(function (error) {
		return error
		});
	  },
	//  新闻详情
	newsDetail(id){
		return axios.get( domain + `index.php?m=api&c=pagecenter&a=detail&catid=30&id=${id}`)
		.then(function (response) {
		  return response.data.data
		})
		.catch(function (error) {
		return error
		});
	  },

	//   活动列表
	  activeList(){
		return axios.get( domain + "index.php?m=api&c=pagecenter&a=activity_list&page=1")
		.then(function (response) {
		  return response.data.data
		})
		.catch(function (error) {
		return error
		});  
	  },

	//   活动详情

	activedetail(id){
		return axios.get( domain + `index.php?m=api&c=pagecenter&a=detail&catid=31&id=${id}`)
		.then(function (response) {
		  return response.data.data
		})
		.catch(function (error) {
		return error
		});  
	  },


	//   预约意向标签
	bookTags(id){
		return axios.get( domain + `index.php?m=api&c=pagebook&a=tags&id=${id}`)
		.then(function (response) {
		  return response.data.data
		})
		.catch(function (error) {
		return error
		});  
	  },

	//   预约选择公寓
	bookHouse(){
		return axios.get( domain + "index.php?m=api&c=project&a=project_list")
		.then(function (response) {
		  return response.data.data
		})
		.catch(function (error) {
		return error
		});  
	  },

	//   预约意向保存
	bookSave(data){
		return axios.post( domain + "index.php?m=api&c=pagebook&a=add",data)
		.then(function (response) {
		  return response.data
		})
		.catch(function (error) {
		return error
		});  
	  },


	//   客户预约列表
	bookList(){
		return axios.get( domain + `index.php?m=api&c=pagebook&a=get_book_list`)
		.then(function (response) {
		  return response.data.data
		})
		.catch(function (error) {
		return error
		});  
	},

	// 客户预约详情

	bookDetail(id){
		return axios.get( domain + `index.php?m=api&c=pagebook&a=bookdetail&id=${id}`)
		.then(function (response) {
		  return response.data.data
		})
		.catch(function (error) {
		return error
		});  
	},

	// 客户评价保存
	orderSave(data){
		return axios.post( domain + 'index.php?m=api&c=pagebook&a=user_pingjia',data)
		.then(function (response) {
		  return response.data
		 })
		.catch(function (error) {
		return error
		});  
	},

	// 评价标签获取
	orderIcon(id){
		return axios.get( domain + `index.php?m=api&c=pagebook&a=user_pingjia_tags&id=${id}`)
		.then(function (response) {
		  return response.data.data
		 })
		.catch(function (error) {
		return error
		});  
	},

	// 销售看房反馈保存
	 fankuiList(data){
		return axios.post( domain + 'index.php?m=api&c=feedback&a=add',data)
		.then(function (response) {
		  return response.data.data
		 })
		.catch(function (error) {
		return error
		});  
	  },

	// 反馈信息详情获取
	fankuidetail(id){
		return axios.get( domain + `index.php?m=api&c=feedback&a=detail&id=${id}`)
		.then(function (response) {
		  return response.data.data
		 })
		.catch(function (error) {
		return error
		});  
	},

	// 预约列表(销售预约管理)

	 bookList2(status){
		return axios.get( domain + `index.php?m=api&c=feedback&a=yuyue_list&type=${status}`)
		.then(function (response) {
		  return response.data.data
		 })
		.catch(function (error) {
		return error
		});  
	  },

	//   未确认预约列表接受预约
	
	// NObookList(){
	// 	return axios.get( domain + 'index.php?m=api&c=feedback&a=detail')
	// 	.then(function (response) {
	// 	  console.log('反馈信息详情获取',response)
	// 	  return response.data.data
	// 	 })
	// 	.catch(function (error) {
	// 	return error
	// 	});  
	//   },

	  //未确认预约详情页
	 
	  NObookdetail(id){
		return axios.get( domain + `index.php?m=api&c=feedback&a=detail_status&id=${id}`)
		.then(function (response) {
		  return response.data.data
		 })
		.catch(function (error) {
		return error
		});  
	  },
   
	//   接受预约表单销售
	jieshou(data){
		return axios.post( domain + 'index.php?m=api&c=feedback&a=order_status',data)
		.then(function (response) {
		  return response.data.data
		 })
		.catch(function (error) {
		return error
		});  
	  },


	//   预定保存
	  bookSave2(data){
		return axios.post( domain + 'index.php?m=api&c=booking&a=add',data)
		.then(function (response) {
		  return response.data
		 })
		.catch(function (error) {
		return error
		});  
	  },

     //项目列表精品旅社
	  getListhouseAll(data){
		return axios.post( domain + 'index.php?m=api&c=project&a=project_all',data)
		.then(function (response) {
		  return response.data.data
		 })
		.catch(function (error) {
		return error
		});  	
	  },
	 
	//   项目列表城市获取
	getcity(){
		return axios.get( domain + 'index.php?m=api&c=pagehome&a=getarea')
		.then(function (response) {
		  return response.data.data
		 })
		.catch(function (error) {
		return error
		});  	
	  },
	 
	  
	//  户型获取
	gethouseType(city,area){
		return axios.post( domain + 'index.php?m=api&c=project&a=house_type',{
      city: city,
      area: area
    })
		.then(function (response) {
		  return response.data.data
		 })
		.catch(function (error) {
		return error
		});  	
	  },



	//   获取全部项目名称列表
	getListhouse(){
		return axios.get( domain + 'index.php?m=api&c=project&a=project_list')
		.then(function (response) {
		  return response.data.data
		 })
		.catch(function (error) {
		return error
		});  	
	  },
	// 获取带有携程项目的名称
	getxiecheng(){
		return axios.get( domain + 'index.php?m=api&c=booking&a=project_xiecheng')
		.then(function (response) {
		  return response.data.data
		 })
		.catch(function (error) {
		return error
		});  	
	  },


	// 获取项目详情
   
	getdetailhouse(id){
		return axios.get( domain + `index.php?m=api&c=project&a=detail&id=${id}`)
		.then(function (response) {
		  return response.data.data
		 })
		.catch(function (error) {
		return error
		});  	
	},


	// 获取品牌故事(改造前后)

	getbrandstory(id){
		return axios.get( domain + `index.php?m=api&c=project&a=project_story&id=${id}`)
		.then(function (response) {
		  return response.data.data
		 })
		.catch(function (error) {
		return error
		});  	
	},

	// 关于我们

	aboutus(){
		return axios.get( domain + `index.php?m=api&c=pagecenter&a=about_list`)
		.then(function (response) {
		  return response.data.data
		 })
		.catch(function (error) {
		return error
		});  	
	},

	// 联系我们

	  contactus(){
		return axios.get( domain + `index.php?m=api&c=pagecenter&a=contact_list`)
		.then(function (response) {
		  return response.data.data
		 })
		.catch(function (error) {
		return error
		});  	
	},

	//  提交短信
	postMessage(data){
		return axios.post( domain + `index.php?m=api&c=pagehome&a=updatemobile`,data)
		.then(function (response) {
		  return response
		 
		 })
		.catch(function (error) {
			console.log(error)
		return error
		
		});  	
	},


	//获取短信验证码
	verifyCode(data){
		return axios.get( domain + `index.php?m=api&c=pagehome&a=getcode&mobile=${data}`)
		.then(function (response) {
		  return response.data
		 })
		.catch(function (error) {
		return error
		});  	
	},
   
	// 获取评价弹框
	appraiseModel(){
		return axios.get( domain + `index.php?m=api&c=pagebook&a=show_tankuang`)
		.then(function (response) {
		  return response.data
		 })
		.catch(function (error) {
		return error
		});  	
	},
  // 获取项目详情页上面的图片
  getHotalListImage(){
    return axios.get(domain + `index.php?m=api&c=project&a=getopening`).then(function (response) {
		  return response.data
		})
		.catch(function (error) {
		  return error
		});  
  }

}

// module.exports = interfaces;
 export default interfaces;

