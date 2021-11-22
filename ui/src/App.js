import React from 'react';
import {observer} from 'mobx-react';
import UsersData    from "./data_stores/UsersData";
import LoginForm    from "./LoginForm";
import SubmitButton from "./SubmitButton";
import './App.css';

class App extends  React.Component {

    async componentDidMount() {
        try {
            let res = await fetch('/isLoggedIn',
                {
                    method: 'post',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                });
            let result = await res.json();
            if (result && result.success) {
                UsersData.loading = false;
                UsersData.isLoggedIn = true;
                UsersData.username = result.username;
            } else {
                UsersData.loading = false;
                UsersData.isLoggedIn = false;
            }
        } catch (e) {
            UsersData.loading = false;
            UsersData.isLoggedIn = false;
        }
    }

    async doLogout() {
        try {
            let res = await fetch('/logout',
                {
                    method: 'post',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                });
            let result = await res.json();

            if (result && result.success) {
                UsersData.isLoggedIn = false;
                UsersData.username = '';
            }

        } catch (e) {
            console.log(e)
        }
    }


    render() {

        if (UsersData.loading) {
            return (
                <div className="app">
                    <div className='container'>
                        Loading, please wait...!
                    </div>
                </div>
            );
        }
        else {
            if(UsersData.isLoggedIn) {
                return (
                    <div className="app">
                        <div className='container'>
                        Welcome {UsersData.username}

                        <SubmitButton
                        text={'Logout'}
                        disabled={false}
                        onClick={ () => this.doLogout()}
                        />
                        </div>
                    </div>
                );
            }
            return (
                <div className="app">
                    <div className='container'>
                    <LoginForm/>
                    </div>
                </div>
            );
        }
    }
}

export default observer(App);
