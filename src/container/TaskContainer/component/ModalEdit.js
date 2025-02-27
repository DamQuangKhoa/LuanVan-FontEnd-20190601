import React, { Component } from 'react'
import './ModalCreate.css';
import {callApi, callApiPaging, callApiDelete, callApiEdit } from './../../../utils/ConnectApi';
import history from './../../../RouterURL/history';
import {validateformBlank} from './../../../constants/jsCommon/validateForm';


//js 




export default class ModalEdit extends Component {
  constructor(props) {
    super(props);
   

    this.state = {
      reposDetail: [],
      editStatus : false,
      name : '',
      leadTask : '',
      developer : '',
      descriptions: '',
      address : '',
      level : 'FR' ,
      statusTask : '',
      msg : '',
     
    }
  }
  selectOptionTeam =()=>{

    var result =[] ;
      
      if(this.state.arrayTeam.length !== 0){
          result = this.state.arrayTeam.map((item, index) =>{
              return <option value={item.id}>{item.name}</option>
          } );
      }
   
      return  result;
    
   
    
  }
  edit =() =>{
  if(validateformBlank()){
    var data = {
      "name": this.refs.name.value,
      "birth": this.refs.birth.value,
      "address": this.refs.address.value,
      "level": this.refs.level.value,
      "email":this.refs.email.value,
      "education": this.refs.education.value,
      "day_of_work": 0,
      "day_of_thinking": 0
    };
   
    callApiEdit('developer',data ,null, this.props.match.params.id )
    .then(response => {
      this.setState({ 
        editStatus :true , 
        msg : "Thành công"
        });
  })
  .catch(function (error) {
    console.log(error);
    this.setState({ 
     
      msg : "bug"
      });
})}else{
  
  this.setState({ 
     
    msg : "Có trường không hợp lệ ,xin kiểm tra lại"
    });
}
  }
  goBack=()=>{
    history.goBack('/home/nhan-su-chinh-thuc');
  }

  loadingData = () => {
    callApiPaging('task/'+ this.props.match.params.id,null,null,'1')
        .then(response => {
            this.setState({ 
              name: response.data.name,
              descriptions : response.data.descriptions,
              status : response.data.status,
              level : response.data.level,
              developer : response.data.developer['name'],
              leadTask : response.data.leadTask['name']
              });
        })
        .catch(function (error) {
            console.log(error);
        })
        
  }
  componentDidMount (){
    this.loadingData();
  }

  onChangeName=(e)=> {
    this.setState({
      name: e.target.value
    });
  }
  onChangeDescriptions =(e)=> {
    this.setState({
      descriptions: e.target.value
    });
   
  }
  
  onChangeStatusTask=(e)=> {
    this.setState({
      statusTask: e.target.value
    });
   
  }
  onChangeDeveloper=(e)=> {
    this.setState({
      developer: e.target.value
    });
   
  }

  onChangeLevel=(e)=> {
    this.setState({
      level: e.target.value
    });
   
  }

  onChangeLeadTask=(e)=> {
    this.setState({
      leadTask: e.target.value
    });
   
  }

  
  

  render() {
    
    return (
           
      <div className="container" className="contai" >
      <br /> <br /> <br />
        <div className="row" > 
        <div className="col-md-4">
        <div className="col-md-4">
    <div className="col-md-4">
  
</div>

</div>
      </div>

      <div className="col-md-7"  >
      
      
        <form className="form-style-9">
        <div className="title">
         
        Sửa công việc
  
         </div>
         <div style={{paddingLeft: "200px" ,zIndex : "1" ,color : "red" ,height: "13px" ,fontSize : "13px",fontWeight: "700"}} >  {this.state.msg} </div>
         <br/>
        <svg viewBox="0 0 500 150" preserveAspectRatio="none" style={{height: '70px', width: '100%'}}>
            <path d="M0.00,92.27 C216.83,192.92 304.30,8.39 500.00,109.03 L500.00,0.00 L0.00,0.00 Z" style={{stroke: 'none', fill: '#e1efe3'}} />
           
          </svg>
              <div className="modal-body container">
             
              <div className="row">
                      <div className="col-md-6">
                     
                        <label >Tên công việc</label>
                        <input type="text" className="form-control" style={{radius :  "10px"}}
                         value={this.state.name} id="name"  onChange={this.onChangeName}
                         ref='name'
                         />
                      </div>
                      
                </div>
               
                  <div className="row">
                    <div className="col-md-3">
                     
                     <label >Người giao việc</label>
                     
                     <input type="text" readOnly className="form-control" name="leadTask" value={this.state.leadTask}
                      onChange={this.onChangeLeadTask}   ref='leadTask' id="leadTask" />
                  
                   </div>
                   <div className="col-md-3">
                     <label >Người nhận việc</label>
                     <input type="text" className="form-control" name="developer" value={this.state.developer}
                      onChange={this.onChangeDeveloper}   ref='developer' id="developer" />
                   </div>
                   </div>

                   <div className="row">
                   <div className="col-md-3">
                     <label >Mức độ</label>
                     
                        <select className="form-control " value={this.state.level} ref='level' onChange={this.onChangeLevel}>
                        <option value="Easy">EASY</option>
                        <option value="Medium">MEDIUM</option>
                        <option value="Hard">HARD</option>
                        <option value="Extreme Hard">EXTREMELY</option>
                        
                        
                      </select>
                   </div>
                   <div className="col-md-3">
                     <label >Trạng thái</label>
                     
                        <select className="form-control " value={this.state.statusTask} ref='statusTask' onChange={this.onChangeStatusTask}>
                        <option value="Active" >ACTIVE</option>
                        <option value="On Processing">ON PROCESSING</option>
                        <option value="Pending">PENDING</option>
                        <option value="Finished">FINISHED</option>
                        <option value="Closed">CLOSED</option>
                        
                      </select>
                   </div>
                   </div>
                   <div className="row">
                   <div className="col-md-6">
                   <label >Mô tả công việc</label> <br/>
                   <textarea rows={4} id='address' value={this.state.descriptions} ref='address' onChange={this.onChangeDescriptions} className="form-control" />
                   
                   </div>
                   </div>
                   </div>
                   
               <br/>
              <div className="bt-action">
              <button type="reset" className="btn btn-success">Làm mới </button>
              <button type="button" className="btn btn-success" onClick={this.edit}>Giao việc </ button>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn " onClick={this.goBack} >Quay lại</button>
              </div>
              </form>
              </div>
              </div>
            </div>
          
        
    )
  }
}
