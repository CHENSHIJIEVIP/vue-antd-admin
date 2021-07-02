const Mock = require('mockjs')
const { deepClone } = require('../utils')
const { asyncRoutes, constantRoutes } = require('./routes.js')

const routes = deepClone([...constantRoutes, ...asyncRoutes])

const roles = [
	{
		key: 'admin',
		name: 'admin',
		description: 'Super Administrator. Have access to view all pages.',
		routes: routes
	},
	{
		key: 'editor',
		name: 'editor',
		description: 'Normal Editor. Can see all pages except permission page',
		routes: routes.filter((i) => i.path !== '/permission') // just a mock
	},
	{
		key: 'visitor',
		name: 'visitor',
		description: 'Just a visitor. Can only see the home page and the document page',
		routes: [
			{
				path: '',
				redirect: 'dashboard',
				children: [
					{
						path: 'dashboard',
						name: '首页',
						meta: { title: '首页', icon: 'dashboard' }
					}
				]
			}
		]
	}
]

module.exports = [
	// mock get all routes form server
	{
		url: '/jc-admin/routes',
		type: 'get',
		response: (_) => {
			return {
				code: 200,
				data: routes
			}
		}
	},

	// mock get all roles form server
	{
		url: '/jc-admin/roles',
		type: 'get',
		response: (_) => {
			return {
				code: 200,
				data: roles
			}
		}
	},

	// add role
	{
		url: '/jc-admin/role',
		type: 'post',
		response: {
			code: 200,
			data: {
				key: Mock.mock('@integer(300, 5000)')
			}
		}
	},

	// update role
	{
		url: '/jc-admin/role/[A-Za-z0-9]',
		type: 'put',
		response: {
			code: 200,
			data: {
				status: 'success'
			}
		}
	},

	// delete role
	{
		url: '/jc-admin/role/[A-Za-z0-9]',
		type: 'delete',
		response: {
			code: 200,
			data: {
				status: 'success'
			}
		}
	}
]