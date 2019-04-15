import React, { Component } from 'react';
import '../App.css'
import Grid from '@material-ui/core/Grid';

const gridStyle={
  height:'100vh'
}

class GridDragable extends Component {
  constructor(props){
    super(props)
    this.state={
      backlog:false,
      todo:false,
      inProgress:false,
      completed:false,
      tasks: [
        {name:"Angular" , category:"wip"},
        {name:"React" , category:"td"},
        {name:"Vue" , category:"ip"},
        {name:"Ember" , category:"complete"},
      ]
    }
    this.onChange=this.onChange.bind(this);
  }

  onChange =(e)=>{
    const name = e.target.name;
    const value = e.target.value;
    this.setState({[e.target.name]: e.target.value});
  }

  onDragStart=(e ,id)=>{
    console.log('drag start:' , id);
    e.dataTransfer.setData("id",id);
  }

  onDragOver = (e) => {
    e.preventDefault();
  }

  onDrop=(e,category)=>{
    let id = e.dataTransfer.getData("id");
    let tasks = this.state.tasks.filter((task)=>{
      if(task.name === id){
        task.category= category;
      }
      return task;
    });
    this.setState({
      ...this.state,
      tasks
    })

  }

  addBackLog=()=>{
    let category = "wip";
    let name = this.state.name
    console.log(name , category)
    const post= {
      name:this.state.name,
      category:category
    }
    var joined = this.state.tasks.concat(post);
    this.setState({ tasks: joined , backlog:false })
  }

  addTodo=()=>{
    let category = "td";
    let name = this.state.name
    console.log(name , category)
    const post= {
      name:this.state.name,
      category:category
    }
    var joined = this.state.tasks.concat(post);
    this.setState({ tasks: joined , todo:false })
  }

  addinProgress=()=>{
    let category = "ip";
    let name = this.state.name
    console.log(name , category)
    const post= {
      name:this.state.name,
      category:category
    }
    var joined = this.state.tasks.concat(post);
    this.setState({ tasks: joined , backlog:false })
  }

  addcompleted=()=>{
    let category = "complete";
    let name = this.state.name
    console.log(name , category)
    const post= {
      name:this.state.name,
      category:category
    }
    var joined = this.state.tasks.concat(post);
    this.setState({ tasks: joined , backlog:false })
  }

  render() {
    var tasks={
      wip:[],
      complete:[],
      td:[],
      ip:[]
    }
    
    this.state.tasks.forEach((t)=>{
      tasks[t.category].push(
        <div key={t.name}
          onDragStart={(e)=>this.onDragStart(e, t.name)}
          draggable
          className="draggable"
        >
          {t.name}
        </div>
      )
    })

    return (
        <div className="container-drag">
          <Grid container>
            <Grid item xs={3} style={gridStyle}>
                <div className="wip"
                onDragOver={(e)=>this.onDragOver(e)}
                onDrop={(e)=>this.onDrop(e , "wip")}
                >
                {!this.state.backlog &&(
                <button onClick={(e)=>this.setState({backlog:!this.state.backlog})}>Add</button>
                )}
                {this.state.backlog &&(
                  <div>
                  <input type="text"  onChange={this.onChange}
                  value={this.state.name}
                  name="name" 
                  />
                  <button onClick={this.addBackLog.bind(this)}>save</button>
                  </div>
                )}
                  <h1>Back Log</h1>
                  <p  style={{margin:'10px'}}>{tasks.wip}</p>
                </div>
            </Grid>
            <Grid item xs={3}  style={gridStyle}>
                <div className="td"
                  onDragOver={(e)=>this.onDragOver(e)}
                onDrop={(e)=>this.onDrop(e , "td")}
                >
                {!this.state.todo &&(
                <button onClick={(e)=>this.setState({todo:!this.state.todo})}>Add</button>
                )}
                {this.state.todo &&(
                  <div>
                  <input type="text"  onChange={this.onChange}
                  value={this.state.name}
                  name="name" 
                  />
                  <button onClick={this.addTodo.bind(this)}>save</button>
                  </div>
                )}
                  <h1>To Do</h1>
                  <p style={{margin:'10px'}}>{tasks.td}</p>
                </div>
              </Grid>
            <Grid item xs={3}  style={gridStyle}>
                <div className="ip"
                  onDragOver={(e)=>this.onDragOver(e)}
                onDrop={(e)=>this.onDrop(e , "ip")}
                >
                {!this.state.inProgress &&(
                <button onClick={(e)=>this.setState({inProgress:!this.state.inProgress})}>Add</button>
                )}           
                {this.state.inProgress &&(
                  <div>
                  <input type="text"  onChange={this.onChange}
                  value={this.state.name}
                  name="name" 
                  />
                  <button onClick={this.addinProgress.bind(this)}>save</button>
                  </div>
                )}
                  <h1>In progress</h1>
                  <p style={{margin:'10px'}}>{tasks.ip}</p>
                </div>
              </Grid>
            <Grid item xs={3}  style={gridStyle}>
            <div className="com"
              onDragOver={(e)=>this.onDragOver(e)}
              onDrop={(e)=>this.onDrop(e , "complete")}
            >
            {!this.state.completed &&(
            <button onClick={(e)=>this.setState({completed:!this.state.completed})}>Add</button>
            )}           
            {this.state.completed &&(
              <div>
              <input type="text"  onChange={this.onChange}
              value={this.state.name}
              name="name" 
              />
              <button onClick={this.addcompleted.bind(this)}>save</button>
              </div>
            )}
              <h1>Completed</h1>
              <p style={{margin:'10px'}}>{tasks.complete}</p>
            </div>
            </Grid>
          </Grid>
        </div>
    );
  }
}

export default GridDragable;
