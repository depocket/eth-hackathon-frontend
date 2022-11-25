import { useState, useEffect } from 'react'
import * as format from '../../utils/format'
import Graph from 'react-graph-vis'
import styles from '../../styles/Home.module.css'
import componentStyles from '../../styles/Components.TokenFlow.module.css'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

export default function RelationWallet(props){
  var [wallet1Address, setWallet1Address] = useState("")
  var [wallet2Address, setWallet2Address] = useState("")
  const [depth, setDepth] = useState(10);
  const [isSSR, setIsSSR] = useState(true);
  useEffect(() => {
    setIsSSR(false);
  }, []);
  const [response, setResponse] = useState({
    "nodes": [],
    "edges": []
  });
  const options = {
    autoResize: true,
    layout: {
      hierarchical: false
    },
    edges: {
      color: "#000000",
      smooth: {
        enabled: true,
        type: "discrete",
        roundness: 0.5
      }
    },
    height: "700px",
    width: "1800px",
    physics: {barnesHut: {gravitationalConstant: -5000, springConstant: 0.001, springLength: 100}},
    interaction: { 
      dragView: true,
      hover: true,
      hoverConnectedEdges: true,
      selectable: true,
      selectConnectedEdges: true
    }
  };
    const handleSubmitClick = function(event) {
      fetch('https://1vrwtsghk9.execute-api.ap-southeast-1.amazonaws.com/production/v1/address/path',
      {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        },
        method: "POST",
        body: JSON.stringify({
          "path": depth,
          "from_address": wallet1Address,
          "to_address": wallet2Address
        })
      }).then(function(res){
        (async function(){
          var dt = await res.json()
          var data = {}
          data.nodes = dt.nodes.map(function(node){
            var newNode = node
            newNode.label = format.getShortestAddress(node.label)
            newNode.title = format.getShortestAddress(node.label)
            newNode.value = node.label
            newNode.shape = 'circle'
            return newNode
          })
          data.edges = dt.edges.map(function(edge){
            var newEdge = edge
            return newEdge
          })
          setResponse(dt)
        })()
      }).catch(function(e){
        console.log(e)
      })
      event.preventDefault();
    }
    return (
        <div>
          <div className={styles.graph_menu}>
          <form>
            <input value={wallet1Address} onChange={function(event){setWallet1Address(event.target.value)}} className={componentStyles.form_input} type="text" name="wallet_address" placeholder="Enter wallet 1 address"/>
            <input value={wallet2Address} onChange={function(event){setWallet2Address(event.target.value)}} className={componentStyles.form_input} type="text" name="token_address" placeholder="Enter wallet 2 address"/>
            <input value={depth} onChange={function(event){setDepth(event.target.value)}} className={componentStyles.form_input} type="number" name="depth" placeholder="Enter the depth of transactions"/>
            <button className={componentStyles.form_button} onClick={handleSubmitClick}>Scan</button>
          </form>
          </div>
          <div className={styles.graph}>
            {!isSSR && console.log(response)}
            {!isSSR && <Graph
              graph={response}
              options={options}
            />
            }
          </div>
        </div>
    )
}