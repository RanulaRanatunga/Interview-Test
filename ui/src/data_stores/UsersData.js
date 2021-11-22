import {extendObservable} from 'mobx';

class UsersData {
    constructor() {
        extendObservable( this, {
            loading:true,
            isLoggedIn:false,
            username:''
        })
    }
}

export default new UsersData();