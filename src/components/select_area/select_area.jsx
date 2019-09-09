import React, { Component } from 'react';
// import { connect } from 'react-redux';
import { PickerView, WhiteSpace } from 'antd-mobile';
import './select_area.scss';
import allAreaInfo from './city';
export class SelectArea extends Component {
  constructor(props) {
    super(props);
    this.state = {
      areaId:[],
      provinceName:"",//省
      cityName:"",//市
      districtName:"",//区,
      value:null
    };
  }    
  onChange(value){
    this.getCityName(value)
  }
  //定义一个方法 用户获取当前用户选择的地区
  getCityName(areaId){
    console.log(areaId)
    let provinceIndex = areaId[0];
    let cityIndex =areaId[1];
    let districtIndex =areaId[2];
    let provinceData=[];
    let cityData =[];
    let districtData = [];
    let provinceName ="";
    let cityName ="";
    let districtName ="";
    provinceData=  allAreaInfo.filter((item)=>item.value===provinceIndex);
    provinceName= provinceData[0].label; 
    cityData= provinceData[0].children.filter((item)=>item.value===cityIndex);
    cityName = cityData[0].label;
    districtData= cityData[0].children.filter((item)=>item.value===districtIndex);
    districtName = districtData[0].label;
    this.setState({
      value:areaId,
      provinceName,
      cityName,
      districtName,
      areaId
    })
  }
  render() {
    let {areaId,provinceName,cityName,districtName } = this.state;
    return (
      <div className="select">
        <div className="select_header">
          <span>请选择您的居住地址</span>
          <span onClick={() => this.props.method(true,provinceName,cityName,districtName,areaId )}>确定</span>
        </div>
        <div className="select-area" onClick={e => e.stopPropagation()}>
        <PickerView
        data={allAreaInfo}
        value={this.state.value}
        onChange={(value)=>this.onChange(value)}
        
      />
        </div>
        <div className="footer" onClick={() => this.props.toControlClose(true)}>取消</div>
      </div>
    )
  }
}

export default SelectArea;
