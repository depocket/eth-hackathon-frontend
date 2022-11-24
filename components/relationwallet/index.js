import Graph from 'react-graph-vis'
import * as format from '../../utils/format'
import styles from '../../styles/Home.module.css'

export default function RelationWallet(props){
    var data = {
        "nodes": [
          {
              "id": "0x33a7",
              "label": "0x7c5fbb2de21b426ec6523fbb5d1bfbd818023a57",
              "title": "address"
          },
          {
              "id": "0x3496",
              "label": "0xef7368f755f5f551a602971b1f792b2737bc6e16",
              "title": "address"
          },
          {
              "id": "0x3380",
              "label": "0x9fb34d03374786a14e776d246f62eabdd9caaefe",
              "title": "address"
          },
          {
              "id": "0x337f",
              "label": "0x89e73303049ee32919903c09e8de5629b84f59eb",
              "title": "address"
          }
      ],
      "edges": [
          {
              "from": "0x337f",
              "to": "0x3380",
              "label": "BUSD -> 0.01"
          },
          {
              "from": "0x337f",
              "to": "0x33a7",
              "label": "BUSD -> 0.01"
          },
          {
              "from": "0x3496",
              "to": "0x33a7",
              "label": "BUSD -> 338.410895156368947387"
          },
          {
              "from": "0x3380",
              "to": "0x337f",
              "label": "BUSD -> 0.001"
          },
          {
              "from": "0x3380",
              "to": "0x337f",
              "label": "BUSD -> 0.1"
          }
      ]
      }
      data.nodes = data.nodes.map(function(node){
        var newNode = node
        newNode.label = format.getShortestAddress(node.label)
        newNode.shape = 'circle'
        return newNode
      })
      data.edges = data.edges.map(function(edge){
        var newEdge = edge
        return newEdge
      })
      const graphs = {
        nodes: data.nodes,
        edges: data.edges
      };
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
    return (
        <div className={styles.graph}>
            <Graph
            graph={graphs}
            options={options}
            />
        </div>
    )
}