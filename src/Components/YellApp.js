import { Table } from 'antd';
import { Divider, Typography } from 'antd';
import { Input, Space } from 'antd';
import { List } from 'antd';
import { Card } from 'antd';


// npm install antd
import React, { useEffect, useState } from "react";
import ReactDOM from 'react-dom/client';
import axios from 'axios'
// import "antd/dist/antd.css";
// npm install axios


const { Title, Paragraph, Text, Link } = Typography;
const { Search } = Input;
const { Meta } = Card;

class YellApp extends React.Component {
  constructor(props) {
	super(props);
	// bind 之后才能使用 this.var
	this.handleChange = this.handleChange.bind(this);
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
		  placeholder="input location+keyword"
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
		  grid={{ gutter: 10, column:2, xs: 1 }}
		  dataSource={this.state.data}
		  renderItem={item => 
			<Card
				hoverable
				style={{ width: 240 }}
				cover={<img alt="example" src={item.image_url} />}
			  >
			<Meta title={item.name} description={item.location.display_address.join('\n')}/>
			</Card>	  
		  }
		/>
		
	  </Space>
	  
	);
  }
  handleChange(e) {
	this.setState({ text: e.target.value });
  }
  
  onSearch(value){
	console.log(value);
	this.setState({
	  loading: true
	});
	let t = value.split('+')
	axios("http://127.0.0.1:5000/yelp_call?keyword="+t[1]+"&location="+t[0])
	.then((response) => {
	  console.log(response.data.businesses)
	  this.setState({ 
		data: response.data.businesses,
		loading: false,
	  });
	  
	});
	
  }
}

export default YellApp;
