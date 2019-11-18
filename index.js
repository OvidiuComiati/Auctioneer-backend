const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()


let state = {
    
    currentOffer: 0,
    bidsHuman: 0,
    bidsComputer: 0,
    overbidingHuman: 0,
    overbidingComputer: 0,
    bids: [],
    sortedBids: []
}

app.use(cors())
app.use(bodyParser.json())

app.post('/human', (req, res) => {

    state.overbidingHuman=Number(state.overbidingHuman)
    state.overbidingComputer=Number(state.overbidingComputer)
    state.bidsHuman=Number(state.bidsHuman)
    state.bidsComputer=Number(state.bidsComputer)

    let amount = Number(req.body.amount)
    state.currentOffer += amount
    state.bidsHuman += amount
    if(amount > 1){
        state.overbidingHuman += amount
    }

    state.bids.push({
        bidder: 'HUMAN',
        amount: Number(req.body.amount),
        currentOffer: state.currentOffer
    })
    

    state.sortedBids.push({
        amount: Number(req.body.amount),
        bidder: 'YOU'
    })
    state.sortedBids=[...new Set(state.sortedBids)]
    state.sortedBids=state.sortedBids.sort(compare)

    console.log(state)
    console.log('human' + typeof state.bidsHuman)

    res.send(state)
})

app.post('/computer', (req, res) => {

    state.overbidingHuman=Number(state.overbidingHuman)
    state.overbidingComputer=Number(state.overbidingComputer)
    state.bidsHuman=Number(state.bidsHuman)
    state.bidsComputer=Number(state.bidsComputer)

    let amount = Number(req.body.amount)
    state.currentOffer += amount
    state.bidsComputer += amount
    if(amount > 1){
        state.overbidingComputer += amount
    }

    state.bids.push({
        bidder: 'COMPUTER',
        amount: Number(req.body.amount),
        currentOffer: state.currentOffer    
    })
    

    state.sortedBids.push({
        amount: Number(req.body.amount),
        bidder: 'COMPUTER' 
    })
    state.sortedBids=[...new Set(state.sortedBids)]
    state.sortedBids=state.sortedBids.sort(compare)

    console.log( state)
    console.log('computer' + typeof state.bidsComputer+'\n')

    res.send(state)
})

app.post('/reset', (req, res) => {
    state = {
        bids: [],
        sortedBids: [],
        bidsHuman: [],
        bidsComputer: [],
        overbidingHuman: 0,
        overbidingComputer: 0,
        currentOffer: 0
    }
    res.send(state)
})
const compare = ( a, b ) => {
    if ( a.amount > b.amount ){
      return -1;
    }
    if ( a.amount < b.amount ){
      return 1;
    }
    return 0;
}


app.listen(3000, () => console.log('Server listening to port 3000'))