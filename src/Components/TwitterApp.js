import { Table } from 'antd';
import { Divider, Typography } from 'antd';
import { Input, Space } from 'antd';
import { List } from 'antd';

// npm install antd
import React, { useEffect, useState } from "react";
import ReactDOM from 'react-dom/client';
import axios from 'axios'
// import "antd/dist/antd.css";
// npm install axios


const { Title, Paragraph, Text, Link } = Typography;
const { Search } = Input;

class TwitterApp extends React.Component {
  constructor(props) {
	super(props);
	// bind 之后才能使用 this.var
	this.handleChange = this.handleChange.bind(this);
	this.handleSubmit = this.handleSubmit.bind(this);
	this.onSearch = this.onSearch.bind(this);
	// this.data = [];
	// state 是特殊的变量，可以 setState，变化后会通知使用到它的组件
	this.state = {
	  text: '',
	  data:[],
	  loading: false,
	};
  }
  // const [data, setData] = useState([]);

  render() {

	return (
	  <Space
		direction="vertical"
		size="middle"
		style={{
		  display: 'flex',
		}}
	  >
		<Search
		  placeholder="input search text for twitter"
		  allowClear
		  onSearch={this.onSearch}
		  style={{
			width: 300,
			margin: 10,
		  }}
		  loading={this.state.loading}
		/>

		<List
		  size="large"
		  bordered
		  dataSource={this.state.data}
		  renderItem={item => <List.Item>{item}</List.Item>}
		/>

	  </Space>

	);
  }
  handleChange(e) {
	this.setState({ text: e.target.value });
  }
  handleSubmit(e) {
	e.preventDefault();
	axios("http://127.0.0.1:5000/search_twitter?query="+this.state.text)
	.then((response) => {
	  console.log(response.data.data)
	  let t = []
	  for(var k of response.data.data){ t.push(k.text) }
	  this.setState({ data: t });
	});
  }

  onSearch(value){
	console.log(value);
	this.setState({
	  loading: true
	});
	axios("http://127.0.0.1:5000/search_twitter?query="+value)
	.then((response) => {
	  // console.log(response.data.data)
	  let t = []
	  for(var k of response.data.data){ t.push(k.text) }
	  this.setState({
		data: t,
		loading: false,
	  });

	});

  }
}

export default TwitterApp;
