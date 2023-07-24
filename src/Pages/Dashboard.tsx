import React, { useState, useEffect } from "react";
import ApiFetch from "../service/ApiCalls/request";
import type { ColumnsType } from "antd/es/table";
import BasicTable from "../Components/BasicTable";
import { DataTypeDeposit, DataTypeTradeOrder, DataTypeWithdrawls } from "../Interfaces/Interfaces";
import { format } from 'date-fns';

//====================================================================
const columnsDeposit: ColumnsType<DataTypeDeposit> = [
  {
    title: "#",
    dataIndex: "id",
    width: 30,
  },
  {
    title: "Amount",
    dataIndex: "amount",
    width: 100,
  },
  {
    title: "From Address",
    dataIndex: "fromAddress",
    width: 150,
  },
  {
    title: "When",
    dataIndex: "when",
    width: 100,
    render: (when: string) => formatDate(when),
  },
  {
    title: "Update Date",
    dataIndex: "updateDate",
    width: 100,
    render: (updateDate: string) => formatDate(updateDate),
  },
  {
    title: "Actions",
    dataIndex: "actions",
    width: 100,
    render: (text, record) => (
      <button onClick={() => onDelete(record.id, ApiFetch.delDepo)} className="btn btn-danger" style={{ marginRight: '10px' }}>Delete</button>
    ),
  },
];

const columnsTradeOrders: ColumnsType<DataTypeTradeOrder> = [
  {
    title: "#",
    dataIndex: "id",
    width: 30,
  },
  {
    title: "Amount",
    dataIndex: "amount",
    width: 100,
  },
  {
    title: "Trade Order Type",
    dataIndex: ["tradeOrderType", "name"],
    width: 100,
  },
  {
    title: "When",
    dataIndex: "when",
    width: 150,
    render: (when: string) => formatDate(when),
  },
  {
    title: "Update Date",
    dataIndex: "updateDate",
    width: 150,
    render: (updateDate: string) => formatDate(updateDate),
  },
  {
    title: "Actions",
    dataIndex: "actions",
    width: 100,
    render: (text, record) => (
      <button onClick={() => onDelete(record.id, ApiFetch.delTradeOrd)} className="btn btn-danger" style={{ marginRight: '10px' }}>Delete</button>
    ),
  },
];

const columnsWithdrawals: ColumnsType<DataTypeWithdrawls> = [
  {
    title: "#",
    dataIndex: "id",
    width: 30,
  },
  {
    title: "Amount",
    dataIndex: "amount",
    width: 100,
  },
  {
    title: "ToAddress",
    dataIndex: "toAddress",
    width: 150,
  },
  {
    title: "2FA Confirmed",
    dataIndex: "wasApprovedByUser2FA",
    width: 150,
    key: "isActive",
    render: (isActive: any) => (isActive ? "True" : "False"),
  },
  {
    title: "When",
    dataIndex: "when",
    width: 150,
    render: (when: string) => formatDate(when),
  },
  {
    title: "Update Date",
    dataIndex: "updateDate",
    width: 150,
    render: (updateDate: string) => formatDate(updateDate),
  },
  {
    title: "Actions",
    dataIndex: "actions",
    width: 100,
    render: (text, record) => (
      <button onClick={() => onDelete(record.id, ApiFetch.delWithd)} className="btn btn-danger" style={{ marginRight: '10px' }}>Delete</button>
    ),
  },
];

//====================================================================
const Dashboard = () => {
  const [data, setData] = useState<any>();
  const [options, setOptions] = useState([]);
  const [selectedValue, setSelectedValue] = useState("Deposit");
  const handleSelectDropDown = (event: any) => {
    setSelectedValue(event.target.value);
  };

  

  useEffect(() => {
    const fetchDropDown = async () => {
      try {
        const response = await fetch(ApiFetch.fetchOperationTypes);
        const data = await response.json();
        const newOptions = data.map((item: any) => ({
          value: item.id,
          label: item.name,
        }));
        setOptions(newOptions);
      } catch (error) {
        console.error(error);
      }
    };
    fetchDropDown();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let url = "";
        switch (selectedValue) {
          case "Deposit":
            url = ApiFetch.fetchDeposits;
            break;
          case "Withdrawal":
            url = ApiFetch.fetchWithdrawals;
            break;
          case "TradeOrder":
            url = ApiFetch.fetchTradeOrder;
            break;
          default:
            url = "";
        }
        if (url) {
          const response = await fetch(url);
          const json = await response.json();
          console.log(response);
          setData(json);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [selectedValue]);

  return (
    <div style={{ textAlign: 'center' }}>
      <h1 style={{ padding: '30px' }}>Operation table</h1>
      <select value={selectedValue} onChange={handleSelectDropDown}>
        {options.map((option: any) => (
          <option key={option.value} value={option.label}>
            {option.label}
          </option>
        ))}
      </select>
      <div className="Table-grid">
        {selectedValue === "Deposit" ? (
          <BasicTable colType= {columnsDeposit} data={data} />
        ) : selectedValue === "Withdrawal" ? (
          <BasicTable colType={columnsWithdrawals} data={data} />
        ) : selectedValue === "TradeOrder" ? (
          <BasicTable colType={columnsTradeOrders} data={data} />
          
        ) : null}
      </div>
    </div>
  );
}

export default Dashboard;

const formatDate = (dateTimeString: any) => {
  const formattedDate = format(new Date(dateTimeString), "dd/MM/yyyy, HH:mm");
  return formattedDate;
  }

const onDelete = async (id: number, url: any) => {

  url += id;
  await fetch(url, {
      method: "DELETE",
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
      }
  });
  window.location.reload(); 
} 
