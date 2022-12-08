import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import querystring from 'qs'
import events from 'events';
import {EventEmitter} from 'events';
import axios from 'axios';
import Avatar from 'react-avatar'

class Github extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            avatar_url: "",
            email: "",
            access_token: null
        };
    }

    componentWillUnmount() {
    }

    componentDidMount() {
    }

    githubLogin() {
        let access_token
        let client_id = 'dad6e9352ab9435c21b3'
        let popWin = window.open(`https://github.com/login/oauth/authorize?client_id=${client_id}`,
            null, "width=600,height=400")

        let code
        let eventEmitter = new EventEmitter();

        let checkCode = () => {
            try {
                let query = popWin.location.search.substring(1)

                code = querystring.parse(query).code

                if ((typeof code) !== 'undefined') {
                    clearInterval(intervalId)
                    popWin.close()
                    eventEmitter.emit('code', code);
                }
            } catch (err) {
            }
        }

        let intervalId = setInterval(checkCode, 1000);

        eventEmitter.on('code', (code) => {
            console.log('get code:' + code)

            axios.get(`http://127.0.0.1:5000/githubToken?code=${code}`)
                .then((res) => {
                    console.log(res);
                    access_token = res.data.accessToken
                    this.setState({access_token: res.data.accessToken});
                    return access_token
                })
                .then((res) => {
                    const config = {
                        headers: {
                            Accept: "application/vnd.github+json",
                            Authorization: "Bearer " + res,
                        }
                    }
                    axios.get(`https://api.github.com/user`, config)
                        .then((res) => {
                            let {name, avatar_url, email} = res.data
                            this.setState({
                                name: name, avatar_url: avatar_url, email: email
                            })
                        })
                });
        })
    }

    render() {
        if (!this.state.access_token) {
            return (
                <div className='btn btn-info github-login' onClick={this.githubLogin.bind(this)}>Click here to Login with GITHUB</div>
            );
        } else {
            return (
                <div>
                    <span>You have successfully login with GITHUB! </span>
                    <Avatar size={300} src={this.state.avatar_url}/>
                    <h3>{this.state.name}</h3>
                    <a href="/">back to Home</a>
                </div>
            );
        }
    }
}

export default Github;
