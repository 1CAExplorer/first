const fs = require("fs");
const path = require("path");

async function ebayTemplate(data) {
    let temp = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <style>
            th, td {
                text-align: left;
            }
            .Sub {
                padding-top: 10px;
                padding-bottom: 10px;
                text-align: end;
            }
            .Tot {
                padding-top: 10px;
                padding-bottom: 10px;
                text-align: end;
            }
            .pay {
                padding-top: 10px;
                padding-bottom: 10px;
                text-align: end;
            }
            .bal {
                padding-top: 10px;
                padding-bottom: 10px;
                text-align: end;
                background-color: #ddd4d43b;
            }
            .number {
                font-weight: 100;
                font-family: "poppins";
            }
            .due {
                font-family: "poppins";
            }
            .Title {
                font-size: 30px;
                font-family: "sans-serif";
                font-weight: bold;
                line-height: 40px;
            }
            .number {
                font-size: 16px;
                color: #9d9292;
            }
            .tab {
                font-size: 13px;
                font-family: "poppins";
                border-collapse: collapse;
                margin-top: 25px;
                padding-left: 10px;
                line-height: 20px;
                vertical-align: top;
                padding-bottom: 25px;
            }
            .logo {
                height: 80px;
                width: 190px;
            }
            .border {
                max-width: 800px;
                margin: auto;
                padding: 50px;
                border: 1px solid #eeeeee;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
                line-height: 24px;
                font-family: Arial, sans-serif;
            }
            .main {
                padding-top: 20px;
            }
            .main2 {
                padding-top: 15px;
            }
            ul {
                padding: 0px;
                padding-bottom: 7px;
                font-size: 14px;
                font-weight: normal;
                margin: 0px;
            }
            th {
                font-size: 15px;
                font-family: poppins;
                font-weight: 200;
            }
        </style>
    </head>
    <body>
        <div class="border">
            <table class="main" width="100%">
                <tr>
                    <td colspan="6" style="font-style: poppins;">
                        <img src="${data.logo}" class="logo"><img><br>
                        <b><span style="font-size:13px;"></span>${data.companyName}</b><br>
                        <span style="color:#9d9292; font-family:poppins">
                            ${data.companyDetails}<br>
                            ${data.companyAddress}
                        </span>
                    </td>
                    <td style="text-align: end">
                        <span class="Title">INVOICE</span><br>
                        <span class="number">${data.invoiceNumber}</span><br>
                        <br>
                        <span class="due">Balance Due</span><br>
                        <b>${data.balanceDue}</b>
                    </td>
                </tr>
            </table>
            <table class="main2" width="100%">
                <tr style="padding-top: 25px;">
                    <td  colspan="3" style="font-size:13px;"><span style="color:#9d9292">Bill To<br></span>
                        <span style="color:#585454"><b>${data.billToName}</b><br>
                            ${data.billToAddress}
                        </span>
                    </td>
                    <td  colspan="3" style="font-size:13px; text-align: end;"><span style="color:#9d9292">
                        Invoice Date :<br>
                        P.O.# : </span>
                    </td>
                    <td  colspan="3" style="font-size:13px;text-align: end;"><span style="color:#585454">
                        ${data.invoiceDate}<br>
                        ${data.poNumber}
                        </span>
                    </td>
                </tr>
            </table>
            <table width="100%" class="tab" style="vertical-align: top;">
                <tr style="background-color: #585454;color:#eeeeee;height:40px;" >
                    <th style="padding-left: 20px;">#</th>
                    <th >Item & Description</th>
                    <th style="text-align:end;">Qty</th>
                    <th style="text-align:end;">Rate</th>
                    <th style="text-align:end;padding-right: 20px">Amount</th>
                </tr>
                ${data.invoiceItems.map((item, index) => `
                    <tr style="vertical-align:top;border-bottom: 1px solid #cfc4c4 ; ">
                        <td style="padding-left: 20px;padding-top: 10px;padding-bottom: 15px;">${index + 1}</td>
                        <td style="padding-top: 10px;padding-bottom: 15px;">
                            <span style="color:#232323; font-size:14px ">${item.itemNumber}</span><br>
                            <span style="color:#9d9292;font-size:14px;padding-bottom: 15px;">
                                ${item.description}
                            </span>
                        </td>
                        <td style="padding-top: 10px;padding-bottom: 15px;text-align:end">${item.qty}</td>
                        <td style="padding-top: 10px;padding-bottom: 15px;text-align:end">${item.rate}</td>
                        <td style="padding-top: 10px;padding-bottom: 15px;text-align:end;padding-right: 20px">${item.amount}</td>
                    </tr>
                `).join('')}
                <tr style="font-size: 14px;">
                    <td colspan="3"></td>
                    <td class="Sub" style="text-align:end;">Sub Total</td>
                    <td style="text-align:end;">${data.subTotal}</td>
                </tr>
                <tr style="font-size: 15px;">
                    <td colspan="3"></td>
                    <td class="Tot" style="text-align:end;"><b>Total</b></td>
                    <td style="text-align:end;"><b>${data.total}</b></td>
                </tr>
                <tr style="font-size: 15px;">
                    <td colspan="3"></td>
                    <td class="pay" style="text-align:end;">Payment Made</td>
                    <td style="text-align:end;color:red;">(-) ${data.paymentMade}</td>
                </tr>
                <tr style="font-size: 15px;">
                    <td colspan="3"></td>
                    <td class="bal"><b>Balance Due</b></td>
                    <td class="bal">${data.balanceDue}</td>
                </tr>
            </table>
            <div style="height:500px ;border-bottom: 1px solid#cfc4c4">
                <p style="font-size:14px; padding-top:50px;color:#9d9292">Notes</p>
                <span style="font-size:13px; padding-top:50px;color:#585454;">PayPal Email : ${data.paypalEmail}</span>
            </div>
        </div>
    </body>
    </html>
    `;

        fs.writeFileSync("after.html", temp);
      
        // return temp;
    }
    function calculateTotals(invoiceData) {
        let totalAmount = 0;
        invoiceData.invoiceItems.forEach(item => {
            item.amount = (parseFloat(item.qty) * parseFloat(item.rate)).toFixed(2);
            totalAmount += parseFloat(item.amount);
        });
    
        invoiceData.subTotal = totalAmount.toFixed(2);
        invoiceData.total = `US$${totalAmount.toFixed(2)}`;
        invoiceData.balanceDue = `US$${(totalAmount - parseFloat(invoiceData.paymentMade)).toFixed(2)}`;
    }
    
    const invoiceData = {
        logo: "https://www.onechanneladmin.com/wp-content/uploads/2023/04/Logo_Sample1-2.svg",
        companyName: "OneAuto",
        companyDetails: "(505) 334-1043",
        companyAddress: "17 3260th Rd<br>Aztec, New Mexico(NM), 87410",
        invoiceNumber: "Invoice# 69409381",
        balanceDue: "US$0.00",
        billToName: "Oneauto.us",
        billToAddress: "7208 W. Sand Lake Road Suite 305<br>Orlando FL 32819<br>United States",
        invoiceDate: "30 Aug 2023",
        poNumber: "2004131484107",
        invoiceItems: [
            {
                itemNumber: "317033S",
                description: "Service: Zoho Workplace<br>Plan: Mail Lite<br>User: 19<br>Payment Duration: Yearly<br>Start 30 August 2023 End 29 August 2024",
                qty: "1.00",
                rate: "230.00",
                amount: ""
            },
            {
                itemNumber: "317033S",
                description: "Service: Zoho Workplace<br>Plan: Mail Lite<br>User: 19<br>Payment Duration: Yearly<br>Start 30 August 2023 End 29 August 2024",
                qty: "1.00",
                rate: "200.00",
                amount: ""
            },
        ],
        subTotal: "",
        total: "",
        paymentMade: "228.00",
        paypalEmail: "marketing@oneauto.us"
    };
    
    calculateTotals(invoiceData);
    console.log(invoiceData)
    ebayTemplate(invoiceData);