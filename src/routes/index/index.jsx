import React ,{ Component} from "react";
import { inject, observer } from 'mobx-react';
@inject('Store') @observer
class Index extends Component{
    render(){
        return(
            <div>这是首页</div>
        )
    }
}
export default observer(Index);