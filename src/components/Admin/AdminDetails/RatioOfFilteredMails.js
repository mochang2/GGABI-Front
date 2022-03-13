import React from "react"
import { Card, CardBody, CardTitle, /*Button, InputGroup, Input, InputGroupAddon*/  } from "reactstrap"

// chart component
import ReactApexChart from "react-apexcharts"


const RatioOfFilteredMails = (props) => {

  // const [period, setPeriod] = useState(1);
  // const handlePeriod = (event) => {
  //   setPeriod(event.target.value);
  // }


  //// TODO: filtered ratio data axios get
  const totalMailAmount         = 10000;
  const spamFilteredAmount      = 4000;
  const staticMLFilteredAmount  = 3000;
  const dynamicMLFilteredAMount = 2000;
  const notClassifiedAmount     = totalMailAmount - spamFilteredAmount - staticMLFilteredAmount - dynamicMLFilteredAMount; // 1000

  const chartSeries =  [spamFilteredAmount, staticMLFilteredAmount, dynamicMLFilteredAMount, notClassifiedAmount];
  const chartOptions =  {  
    chart: {
      events: {
        legendClick: function(event, chartContext, config) {
          window.open("https://www.naver.com", "분석 자세히 창");
        }
      }
    },
    dataLabels: {
      enabled: true,
      formatter: function (val) {
        return val + "%"
      },
    },
    labels: ["필터", "정적ML", "동적ML", "❔미분류❓"],
    legend: {
      position: "bottom",
    },
    plotOptions: {
      pie: {
        offsetY: 50,
        startAngle: 5,
        donut: {
          size: "65%",
          labels: {
            show: true,
            name: {
              show: true,
              formatter: function (val) {
                return val.includes("미분류") ? "미분류" : val;
              }
            },
            value: {
              show: true,
              formatter: function (val) {
                return val.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",") + "개";
              }
            },
            total: {
              show: true,
              label: "Total",
              fontSize: "1.6rem",
              fontFamily: "Helvetica, Arial, sans-serif",
              fontWeight: 600,
              color: "#373d3f",
              formatter: function (w) {
                let res = 0;
                for (let i in w.globals.seriesTotals) { res += w.globals.seriesTotals[i]; }
                return res.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",") + "개";
              }
            }
          }
        }
      }
    },
    tooltip: {
      enabled: true,
      y: {
        formatter: function (val) {
          if (typeof val !== "undefined") { 
            if (val === notClassifiedAmount){
              return null
            }
            return val.toFixed(0).replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ","); 
          }
          return val;
        },
        title: {
          formatter: function (val) { 
            return val.includes("미분류") ? "자세히 보고 싶으면 범례를 클릭하세요." : val;
          }
        },
      }
    },
  };

  return (
    <Card>
      <CardBody>

        <CardTitle style={{fontSize: "18px"}}>
          필터링 비율
        </CardTitle>

        {/*
        <div className="float-end d-flex" style={{display: "none !important"}}>
          <div className="d-flex">
            <InputGroup>
              <InputGroupAddon addonType="prepend" style={{height: "100%"}}>기간 :</InputGroupAddon>
              <Input min={1} max={1000} type="number" step="1" value={period} onChange={handlePeriod} />
              <InputGroupAddon addonType="append" style={{height: "100%"}}>개월</InputGroupAddon>
            </InputGroup>
          </div>

          <div>
            <Button color="primary" style={{margin: "0 0 0 8px", padding: "0.25rem 0.75rem"}}>입력</Button>
          </div>
        </div>*/}

        <div className="mt-5">
          <div className="donut-chart-sizing-wrapper">
            <ReactApexChart options={chartOptions} series={chartSeries} type="donut" />
          </div>
        </div>


      </CardBody>
    </Card>
  )
}

export default RatioOfFilteredMails