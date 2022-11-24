import { useState, useEffect } from 'react'
import * as format from '../../utils/format'
import Graph from 'react-graph-vis'
import styles from '../../styles/Home.module.css'
import componentStyles from '../../styles/Components.TokenFlow.module.css'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

export default function TokenFlow(props){
  var [walletAddress, setWalletAddress] = useState("")
  var [tokenAddress, setTokenAddress] = useState("")
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
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
    height: "600px",
    width: "1200px",
    physics: {
      stabilization: true,
    },
    interaction: { 
      dragView: true,
      hover: true,
      hoverConnectedEdges: true,
      selectable: true,
      selectConnectedEdges: true
    }
  };
    const handleSubmitClick = function(event) {
      console.log(walletAddress, tokenAddress, startDate.toISOString(), endDate.toISOString())
      fetch('https://1vrwtsghk9.execute-api.ap-southeast-1.amazonaws.com/production/v1/address/full-flow',
      {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        },
        method: "POST",
        body: JSON.stringify({
          "depth": depth,
          "address": walletAddress,
          "token": tokenAddress,
          "from": startDate.toISOString(),
          "to": endDate.toISOString()
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
            <input value={walletAddress} onChange={function(event){setWalletAddress(event.target.value)}} className={componentStyles.form_input} type="text" name="wallet_address" placeholder="Enter wallet address"/>
            <input value={tokenAddress} onChange={function(event){setTokenAddress(event.target.value)}} className={componentStyles.form_input} type="text" name="token_address" placeholder="Enter token address"/>
            <label style={{marginLeft: "4px"}}>
              Start date:
              <DatePicker className={componentStyles.form_input} selected={startDate} onChange={(date) => setStartDate(date)}/>
            </label>
            <label style={{marginLeft: "4px"}}>
              End date:
              <DatePicker className={componentStyles.form_input} selected={endDate} onChange={(date) => setEndDate(date)}/>
            </label>
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