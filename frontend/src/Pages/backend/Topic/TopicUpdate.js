import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import topicservice from "../../../Services/TopicService";

function TopicUpdate() {
    const {id} =useParams('id');
    const navigate = useNavigate ();
    // const [category,setCategory]=useState([]);
    const [topics,setTopics]=useState([]);
    useEffect(function(){
        (async function(){
            await topicservice.getAll().then(function(result){
                setTopics(result.data.data);
            });
        })();

    },[]);

    useEffect(function(){
        (async function(){
            await topicservice.getById(id).then(function(result){

                const tmp=result.data.data;
                // setCategory(tmp);
                setName(tmp.name);
                setSlug(tmp.slug);
                setEmail(tmp.email);
                setMetakey(tmp.metakey);
                setMetadesc(tmp.metadesc);
                setStatus(tmp.status);
                setParentId(tmp.parent_id);
             
            });
        })();

    },[]);


const [name, setName] = useState('');
const [slug, setSlug] = useState('');
const [email, setEmail] = useState('');
const [metakey, setMetakey] = useState('');
const [metadesc, setMetadesc] = useState('');
const [parent_id, setParentId] = useState(0);
const [status, setStatus] = useState(0);
async function topicEdit(event) {
    event.preventDefault();

    //dùng để upload file lên
    var topic= new FormData();

    topic.append("name",name);
    topic.append("slug",slug);
    topic.append("email",email)
    topic.append("metakey",metakey);
    topic.append("metadesc",metadesc);
    topic.append("status",status);
    topic.append("parent_id",parent_id);


    await topicservice.update(topic,id).
        then(function (res) {
            alert(res.data.message);
            navigate('../../admin/topic',{replace:true});
        });

}
    return ( 
        <form onSubmit={topicEdit} method="post" >
            <div className="card">
                <div className="card-header">
                    <div className="row" >
                        <div className="col-md-6" >
                            <strong className="text-danger">Thêm chủ đề</strong>

                        </div>

                        <div className="col-md-6 d-flex justify-content-end " >
                            <button type="submit" className="btn btn-sm btn-success me-2">Lưu</button>
                            <Link to="/admin/topic" className="btn btn-sm btn-info">
                                Về danh sách
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="card-body">Body
                    <div className="row">
                        <div className="col-md-9">
                            <div className="mb-3">
                                <label htmlFor="name">Tên chủ đề</label>
                                <input type="text"
                                    name="name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="form-control"
                                />

                            <div className="mb-3">
                                <label htmlFor="name">Slug</label>
                                <textarea 
                                    name="slug"
                                    value={slug}
                                    onChange={(e) => setSlug(e.target.value)}
                                    className="form-control"></textarea>
                            </div>
                            </div>  <div className="mb-3">
                                <label htmlFor="name">Email</label>
                                <input type="text"
                                    name="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="form-control"
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="name">Tu khoa</label>
                                <textarea 
                                    name="metakey"
                                    value={metakey}
                                    onChange={(e) => setMetakey(e.target.value)}
                                    className="form-control"></textarea>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="name">Mô tả</label>
                                <textarea 
                                    name="metadesc"
                                    value={metadesc}
                                    onChange={(e) => setMetadesc(e.target.value)}
                                    className="form-control"></textarea>
                            </div>

                        </div>

                        <div className="col-md-3">
                            <div className="md-3">
                                <label >Danh muc cha</label>
                                <select 
                                    name="parent_id" 
                                    value={parent_id} 
                                    onChange={(e) => setParentId(e.target.value)} 
                                    className="form-control">
                                    <option value="0">None</option>
                                    {topics.map(function(top,index){
                                        return(
                                            <option key={index} value={top.id}>{top.name}</option>
                                        )
                                    })}

                                </select>
                            </div>

                            <div className="md-3">
                                <label >Trang thai</label>
                                <select 
                                    name="status"
                                    className="form-control"
                                    value={status}
                                    onChange={(e) => setStatus(e.target.value)} >
                                    <option value="1"> Xuat ban</option>
                                    <option value="2"> Chua Xuat Ban</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
}

export default TopicUpdate;