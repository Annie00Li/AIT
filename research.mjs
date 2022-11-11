class EquipmentList extends React.Component{
    render(){
        return (
            <div>
                <a href="javascript:;">planeA</a>
                <a href="javascript:;">planeB</a>
                <a href="javascript:;">planeC</a>
                <ul>
                    <li>A20</li>
                    <li>B6K</li>
                    <li>C20</li>
                </ul>
            </div>
        )
    }
}
ReactDOM.render(
    <EquipmentList />,
    document.getElementById('example')
);

class EquipmentList extends React.Component{
    constructor(){
        super();
        this.state={
            equipmentList:[
                {
                    id:1,
                    title:'A20'
                },
                {
                    id:2,
                    title:'B6K'
                },
                {
                    id:3,
                    title:'C20'
                }
            ],
        }
    }

    render(){
        return (
            <div>
                <a href="javascript:;">planeA</a>
                <a href="javascript:;">planeB</a>
                <a href="javascript:;">planeC</a>
                <ul>
                    {this.state.equipmentList.map(item=><li key={item.id}>{item.title}</li>)}
                </ul>
            </div>
        )
    }
}
ReactDOM.render(
    <EquipmentList />,
    document.getElementById('example')
);

class EquipmentList extends React.Component{
    constructor(){
        super();
        this.state={
            equipmentList:[
                {
                    id:1,
                    title:'A20'
                },
                {
                    id:2,
                    title:'B6K'
                },
                {
                    id:3,
                    title:'C20'
                }
            ],
            equipmentListNow:[]
        }
    }

    switchTab(id){
        let _list=this.state.equipmentList.filter(item=>item.id===id);
        this.setState({
            equipmentListNow:_list
        })
    }

    render(){
        return (
            <div>
                <a href="javascript:;" onClick={()=>{
                    this.switchTab(1);
                }}>planeA</a>
                <a href="javascript:;" onClick={()=>{
                    this.switchTab(2);
                }}>planeB</a>
                <a href="javascript:;" onClick={()=>{
                    this.switchTab(3);
                }}>planeC</a>
                <ul>
                    {this.state.equipmentListNow.map(item=><li key={item.id}>{item.title}</li>)}
                </ul>
            </div>
        )
    }
}
ReactDOM.render(
    <EquipmentList />,
    document.getElementById('example')
);