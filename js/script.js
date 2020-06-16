window
  .AirSwapTrader({
    onCreate: (order, cid) => {
      console.log('Order created!')
    },
    onClose: (transactionHash) => {
      console.log('Widget closed')
    },
  })
  .render('body')