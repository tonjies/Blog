// 扩展一些框架便利的方法
module.exports = {

	/**
	 * 返回客户端的内容
	 * 接口是否成功
	 * 返回数据
	 * 返回信息提示
	 * 返回状态码
	 */
	returnBody(body={},status=true,msg='success',code=200){
		this.body={
			status:status,
			body:body,
			msg,
			code:code
		}
	},
	// 验证token
	async checkToken(token) {
		return await this.app.jwt.verify(token, this.app.config.jwt.secret)
	},

	//生成token
	async getToken(user) {
		//登录成功，生成token
		const token = this.app.jwt.sign({
			username: user.username,
			password: user.password,
			userId: user.userId
		}, this.app.config.jwt.secret, {expiresIn: 60 * 60 * 24});
		return token;
	}
}
