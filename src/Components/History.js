import React from 'react';
import {Table, Divider, Tag} from 'antd';
import axios from "axios";

const {Column} = Table;

class History extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            loading: true
        }
    };

    componentDidMount() {
        const _this = this;
        axios.get(`http://127.0.0.1:5000/history`)
            .then((res) => {
                _this.setState({
                    data: res.data.data,
                    loading: false
                })

            })
    }


    render() {
        if (this.state.loading) {
            return <div>Loading...please waiting</div>
        } else {
            return (
                <div class="history_table">
                <Table dataSource={this.state.data}>
                    <Column title="ID" dataIndex="id" key="id" fixed="left"/>
                    <Column title="searchContent" dataIndex="searchContent" key="searchContent"/>
                    <Column title="resultNumber" dataIndex="resultNumber" key="resultNumber"/>
                    <Column title="searchTime" dataIndex="searchTime" key="searchTime"/>
                </Table>
                </div>
            );
        }

    }
}

export default History;
