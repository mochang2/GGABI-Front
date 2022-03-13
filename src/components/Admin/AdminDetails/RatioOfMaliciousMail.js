import React, { useState } from "react"
import { Card, CardBody, CardTitle, Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap"
import classnames from "classnames"

// chart component
import ReactApexChart from "react-apexcharts"

const ArraySum = (array) => {
  return array.reduce((a, b) => a + b, 0)
}

const RatioOfMaliciousMail = (props) => {

  // monthly, daily tabs
  const [activeTab, setActiveTab] = useState("monthly");

  const handleActiveTab = (tab) => {
    if(activeTab !== tab) { setActiveTab(tab); }
  }

  // TODO: data axios get
  // bar chart data, option
  const x_axis_cnt = 7;
  const monthlyTotal = [1453, 1530, 1636, 1673, 1695, 1324, 1610];
  const monthlyMalicious = [1261, 344, 1089, 1110, 952, 390, 1549];
  const monthlyNormal = Array.from({length: x_axis_cnt}, (_, i) => (monthlyTotal[i] - monthlyMalicious[i]));

  const weeklyTotal  = [436, 341, 452, 270, 445, 340, 254];
  const weeklyMalicious = [192, 206, 400, 175, 362, 29, 10];
  const weeklyNormal = Array.from({length: x_axis_cnt}, (_, i) => (weeklyTotal[i] - weeklyMalicious[i]));

  const dailyTotal = [38, 59, 38, 68, 44, 48, 90];
  const dailyMalicious = [10, 8, 20, 18, 20, 5, 2];
  const dailyNormal = Array.from({length: x_axis_cnt}, (_, i) => (dailyTotal[i] - dailyMalicious[i]));

  const monthlyDataSubtitle = [ArraySum(monthlyMalicious), ArraySum(monthlyTotal)];
  const weeklyDataSubtitle  = [ArraySum(weeklyMalicious), ArraySum(weeklyTotal)];
  const dailyDataSubtitle   = [ArraySum(dailyMalicious), ArraySum(dailyTotal)];

  const monthlySeries = [
    {name: "전체 메일", type: "column", data: monthlyTotal},
    {name: "악성 메일", type: "column", data: monthlyMalicious},
    {name: "정상 메일", type: "column", data: monthlyNormal}
  ];
  const weeklySeries  = [
    {name: "전체 메일", type: "column", data: weeklyTotal},
    {name: "악성 메일", type: "column", data: weeklyMalicious},
    {name: "정상 메일", type: "column", data: weeklyNormal}
  ];
  const dailySeries   = [
    {name: "전체 메일", type: "column", data: dailyTotal},
    {name: "악성 메일", type: "column", data: dailyMalicious},
    {name: "정상 메일", type: "column", data: dailyNormal}
  ];

  const now   = new Date();
  const year  = now.getFullYear();
  const month = now.getMonth();
  const date  = now.getDate();

  const monthlyLabel = Array.from({length: x_axis_cnt}, 
                                    (_, i) => (month - 5 + i).toString() + "월" 
                                  );
  const weeklyLabel  = Array.from({length: x_axis_cnt}, 
                                    (_, i) => new Date(year, month, date - 6 * 7 + i * 7).toLocaleDateString().slice(5,-1) 
                                  );
  const dailyLabel   = Array.from({length: x_axis_cnt},
                                    (_, i) => new Date(year, month, date - 6 + i).toLocaleDateString().slice(-3,-1) + "일"
                                  );

  const commonOption = {
    barChartHeight: "400",
    annotationColor: "#706551",

    animations: {
      enabled: true,
      easing: "easeinout",
      speed: 800,
      animateGradually: {
          enabled: true,
          delay: 100
      },
      dynamicAnimation: {
          enabled: true,
          speed: 350
      }
    },
    chart: {  // download 가능하게 하는 버튼
      stacked: !1,
      toolbar: {
        show: true,
        offsetX: -24,
        offsetY: 18,
        export: {
          csv: {
            filename: "malicious mail ratio",
            columnDelimiter: ',',
            headerCategory: 'category',
            headerValue: 'value',
            dateFormatter(timestamp) {
              return new Date(timestamp).toDateString()
            }
          },
          svg: {
            filename: "malicious mail ratio",
          },
          png: {
            filename: "malicious mail ratio",
          }
        }
      }
    },
    dataLabels: {
      enabled: false,
      offsetY: -20,
      style: {
        fontSize: '12px',
        fontFamily: 'Helvetica, Arial, sans-serif',
        colors: ["#706551"]
      },
      background: {
        enabled: true,
        borderRadius: 2,
        borderWidth: 1,
        borderColor: '#fff',
      },
    },  
    fill: {
      opacity: [0.99],
      type: "gradient",
      gradient: {
        inverseColors: false,
        type: "vertical",
        opacityFrom: 0.99,
        opacityTo: 0.89,
        stops: [0, 99, 100]
      }
    },
    grid: {
      show: true,
      borderColor: '#f1f1f1',
      strokeDashArray: 0,
      position: 'back',
      xaxis: {
          lines: {
              show: false
          }
      },   
      yaxis: {
          lines: {
              show: true
          }
      },  
    },
    plotOptions: {
      bar: { 
        columnWidth: "60",
        dataLabels: {
          position: "top",
        },
      },
    },
    tooltip: {
      shared: !0,
      intersect: !1,
      y: {
        formatter: function (y) {
          if (typeof y !== "undefined") { return y.toFixed(0) + " 건"; }
          return y;
        }
      }
    },
    yaxis: {
      lines: {
        show: true
      },
      title: { 
        text: "건",
        rotate: "90deg",
      },
    },
  }

  const monthlyOption = {
    animations: commonOption["animations"],
    chart: commonOption["chart"],
    dataLabels: commonOption["dataLabels"],
    fill: commonOption["fill"],
    grid: commonOption["grid"],
    plotOptions: commonOption["plotOptions"],
    tooltip: commonOption["tooltip"],
    yaxis: commonOption["yaxis"],
    
    annotations: {
      position: 'front' ,
      yaxis: [
        {
          y: (ArraySum(monthlyMalicious) / x_axis_cnt) || 0,
          borderColor: commonOption["annotationColor"],
          label: {
            borderColor: commonOption["annotationColor"],
            style: {
              colors: ["#fff"],
              background: commonOption["annotationColor"],
            },
            text: "악성 메일 평균 건수"
          }
        }
      ]
    },
    colors: ["#2D419C", "#5A73E8", "#cfcfcf"], 
    labels: monthlyLabel, // 주석해도 오류 없음
    xaxis: {
      categories: monthlyLabel,
      type: "string",
    },
  };

  const weeklyOption = {
    animations: commonOption["animations"],
    chart: commonOption["chart"],
    dataLabels: commonOption["dataLabels"],
    fill: commonOption["fill"],
    grid: commonOption["grid"],
    plotOptions: commonOption["plotOptions"],
    tooltip: commonOption["tooltip"],
    yaxis: commonOption["yaxis"],
    
    annotations: {
      position: 'front' ,
      yaxis: [
        {
          y: (ArraySum(weeklyMalicious) / x_axis_cnt) || 0,
          borderColor: commonOption["annotationColor"],
          label: {
            borderColor: commonOption["annotationColor"],
            style: {
              colors: ["#fff"],
              background: commonOption["annotationColor"]
            },
            text: "악성 메일 평균 건수"
          }
        }
      ]
    },
    colors: ["#217373", "#4BC0C0", "#DBCCC5"],
    labels: weeklyLabel, // 주석해도 오류 없음
    xaxis: {
      categories: weeklyLabel,
      type: "string",
    },
  };

  const dailyOption = {
    animations: commonOption["animations"],
    chart: commonOption["chart"],
    dataLabels: commonOption["dataLabels"],
    fill: commonOption["fill"],
    grid: commonOption["grid"],
    plotOptions: commonOption["plotOptions"],
    tooltip: commonOption["tooltip"],
    yaxis: commonOption["yaxis"],

    annotations: {
      position: 'front' ,
      yaxis: [
        {
          y: (ArraySum(dailyMalicious) / x_axis_cnt) || 0,
          borderColor: commonOption["annotationColor"],
          label: {
            borderColor: commonOption["annotationColor"],
            style: {
              colors: ["#fff"],
              background: commonOption["annotationColor"]
            },
            text: "악성 메일 평균 건수"
          }
        }
      ]
    },
    colors: ["#5B68A6", "#DBC5DB", "#9eacf2"],
    labels: dailyLabel, // 주석해도 오류 없음
    xaxis: {
      categories: dailyLabel,
      type: "string",
    },

  }



  return (
    <Card>
      <CardBody>
        
        <div className="float-end">
          <Nav tabs style={{fontSize: "12px"}}>
            <NavItem>
              <NavLink className={classnames({ active: activeTab === "monthly" })} onClick={() => { handleActiveTab("monthly"); }}>
                월별
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink className={classnames({ active: activeTab === "weekly" })} onClick={() => { handleActiveTab("weekly"); }}>
                주별
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink className={classnames({ active: activeTab === "daily" })} onClick={() => { handleActiveTab("daily"); }}>
                일별
              </NavLink>
            </NavItem>
          </Nav>
        </div>

        <CardTitle style={{fontSize: "18px"}}>
          정상 / 악성 메일 개수
        </CardTitle>


        <TabContent activeTab={activeTab}>

          <TabPane tabId="monthly">  
            <div className="mt-5">
              <div className="d-flex bar-graph-description">
                {`기간 내 전체 메일 수: ${monthlyDataSubtitle[1]} | 악성 메일 수: ${monthlyDataSubtitle[0]}`}
              </div>
              <ReactApexChart options={monthlyOption} series={monthlySeries}
                height={commonOption["barChartHeight"]} type="bar"
                className="apex-charts"/>
            </div>
          </TabPane>

          <TabPane tabId="weekly">  
            <div className="mt-5">
              <div className="d-flex bar-graph-description">
                {`기간 내 전체 메일 수: ${weeklyDataSubtitle[1]} | 악성 메일 수: ${weeklyDataSubtitle[0]}`}
              </div>
              <ReactApexChart options={weeklyOption} series={weeklySeries}
                height={commonOption["barChartHeight"]} type="bar"
                className="apex-charts"/>
            </div>
          </TabPane>
          
          <TabPane tabId="daily"> 
            <div className="mt-5">
              <div className="d-flex bar-graph-description">
                {`기간 내 전체 메일 수: ${dailyDataSubtitle[1]} | 악성 메일 수: ${dailyDataSubtitle[0]}`}
              </div>
              <ReactApexChart options={dailyOption} series={dailySeries}
                height={commonOption["barChartHeight"]}type="bar"
                className="apex-charts"/>
            </div>
          </TabPane>

        </TabContent>

      </CardBody>
    </Card>
  )
}

export default RatioOfMaliciousMail