var express = require('express');
var router = express.Router();
const excel = require('node-excel-export');
const sqlController = require('../controllers/sql');

//Listar
router.get('/Listado', (req, res, next) => {
    sqlController.listar().then(
        (success)=>{
          res.json(success);
        },
        (error)=>{
          console.log(error);
          res.status(400).json(error);
        }
    );
});

//Insertar
router.post('/Insert', function(req, res, next) {
    sqlController.Insertar(req.body).then(
        (success)=>{
          res.json(success);
        },
        (error)=>{
          res.status(400).json(error);
        }
    );
});


// Exportar a excel
router.get('/export', ( req, res )=>{
 // You can define styles as json object
const styles = {
    headerDark: {
      fill: {
        fgColor: {
          rgb: 'FF000000'
        }
      },
      font: {
        color: {
          rgb: 'FFFFFFFF'
        },
        sz: 14,
        bold: true,
        underline: true
      }
    },
    cellPink: {
      fill: {
        fgColor: {
          rgb: 'FFFFCCFF'
        }
      }
    },
    cellGreen: {
      fill: {
        fgColor: {
          rgb: 'FF00FF00'
        }
      }
    }
  };
   
  //Array of objects representing heading rows (very top)
  const heading = [
    [{value: 'a1', style: styles.headerDark}, {value: 'b1', style: styles.headerDark}, {value: 'c1', style: styles.headerDark}],
    ['a2', 'b2', 'c2'] // <-- It can be only values
  ];
   
  //Here you specify the export structure
  const specification = {
    iCodEmpresa: { // <- the key should match the actual data key
      displayName: 'Customer', // <- Here you specify the column header
      headerStyle: styles.headerDark, // <- Header style
      width: 120 // <- width in pixels
    },
    vRUC: {
      displayName: 'Status',
      headerStyle: styles.headerDark,
      width: '10' // <- width in chars (when the number is passed as string)
    },
    vRazonSocial: {
      displayName: 'Description',
      headerStyle: styles.headerDark,
      width: 500 // <- width in pixels
    }
  }
   
  // The data set should have the following shape (Array of Objects)
  // The order of the keys is irrelevant, it is also irrelevant if the
  // dataset contains more fields as the report is build based on the
  // specification provided above. But you should have all the fields
  // that are listed in the report specification

  // Define an array of merges. 1-1 = A:1
  // The merges are independent of the data.
  // A merge will overwrite all data _not_ in the top-left cell.
  const merges = [
    { start: { row: 1, column: 1 }, end: { row: 1, column: 10 } },
    { start: { row: 2, column: 1 }, end: { row: 2, column: 5 } },
    { start: { row: 2, column: 6 }, end: { row: 2, column: 10 } }
  ]
  
  sqlController.exportExcel().then(
      (success)=>{ 
        // Create the excel report.
        // This function will return Buffer
        const report = excel.buildExport(
            [ // <- Notice that this is an array. Pass multiple sheets to create multi sheet report
                {
                    name: 'Report', // <- Specify sheet name (optional)
                    heading: heading, // <- Raw heading array (optional)
                    merges: merges, // <- Merge cell ranges
                    specification: specification, // <- Report specification
                    data: success // <-- Report data
                }
            ]
        );
            
        // You can then return this straight
        res.attachment('reportDefault.xlsx'); // This is sails.js specific (in general you need to set headers)
        res.send(report);
    },
    (error)=>{
      res.status(400).json(error);
    });
})

  
module.exports = router;
