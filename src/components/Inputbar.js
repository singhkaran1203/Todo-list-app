import { useEffect, useState } from "react"

const getitem=()=>{
    const list=localStorage.getItem("mytodolist")
    if(list){
        return JSON.parse(list);
    }
    else return [];
}

function Inputbar() {

    const [data, setdata] = useState("");
    const [items, setitems] = useState(getitem());
    const [istoggle,setistoggle] = useState(false);
    const [toedit,settoedit]=useState({});
    const time=new Date();

    function additem() {
        if (data === "") {
            alert("please fill the data");
        }
        else if(data && istoggle){
            setitems(items.map((ele)=>{
                if(ele.id===toedit.id){
                 return {...ele,name:data}
                }
                return ele;
        }))
            setistoggle(false);
            setdata("");
        }
        else {
            const item={
                name:data,
                id: time.getTime().toString()
            }
            setitems([...items, item]);
            setdata("");
        }
    }

    function deleteitem(id){
        setitems(items.filter((item)=>{
            return item.id!==id;
        }))
    }

    function edititem(id){
        const item=items.find((ele)=>{
            return ele.id===id;
        })
        settoedit(item);
        setdata(item.name);
        setistoggle(true);
    }


    useEffect(()=>{
        localStorage.setItem("mytodolist",JSON.stringify(items));
    },[items])

    return (
        <div className="d-flex justify-content-center flex-column">
            <div className="input-group m-2">
                <input type="text" className="form-control" placeholder="add items" onChange={(e) => { setdata(e.target.value) }} value={data} />
                {istoggle?<span className="input-group-text" onClick={additem}><i className="bi bi-pen"></i></span>:<span className="input-group-text" onClick={additem}><i className="bi bi-plus-square-dotted"></i></span>}

            </div>
            {
                items.map((curr) => {
                    return (<div className="bg-secondary text-dark d-flex justify-content-between p-2 mb-1 m-2 rounded" key={curr.id}>
                        <h4 className="mb-0"><strong>{curr.name}</strong></h4>
                        <div className="">
                            <span className="m-1"><i className="bi bi-pen" onClick={()=>{edititem(curr.id)}}></i></span>
                            <span className="m-1"><i className="bi bi-trash3" onClick={()=>{deleteitem(curr.id)}}></i></span>
                        </div>
                    </div>
                    )
                })
            }
        </div >

    );
}

export default Inputbar;