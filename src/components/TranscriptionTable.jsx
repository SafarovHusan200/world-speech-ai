"use client";

import React, { useEffect, useState } from "react";
import { Table } from "antd";
import qs from "qs";
const columns = [
  {
    title: "#",
    dataIndex: "login",
    render: (login) => login.uuid.slice(0, 7),
    width: "10%",
  },
  {
    title: "Дата",
    dataIndex: "registered", // Bosh qism
    sorter: true,
    render: (registered) => registered.date, // Qiymatni render qilish
    width: "20%",
  },
  {
    title: "Название",
    dataIndex: "name",
    sorter: true,
    render: (name) => `${name.first} ${name.last}`,
    width: "20%",
  },
  {
    title: "Длительность",

    dataIndex: "registered", // Bosh qism
    sorter: true,
    render: (registered) => registered.age, // Qiymatni render qilish

    // filters: [
    //   {
    //     text: "Male",
    //     value: "male",
    //   },
    //   {
    //     text: "Female",
    //     value: "female",
    //   },
    // ],
    width: "10%",
  },
  {
    title: "Статус",
    dataIndex: "email",
  },
  {
    title: "Источник",
    dataIndex: "email",
  },
];

const getRandomuserParams = (params) => ({
  results: params.pagination?.pageSize,
  page: params.pagination?.current,
  ...params,
});

const TranscriptionTable = () => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });

  const fetchData = () => {
    setLoading(true);
    fetch(
      `https://randomuser.me/api?${qs.stringify(
        getRandomuserParams(tableParams)
      )}`
    )
      .then((res) => res.json())
      .then(({ results }) => {
        setData(results);
        console.log(results);
        setLoading(false);
        setTableParams({
          ...tableParams,
          pagination: {
            ...tableParams.pagination,
            total: 200,
            // 200 is mock data, you should read it from server
            // total: data.totalCount,
          },
        });
      });
  };

  useEffect(() => {
    fetchData();
  }, [
    tableParams.pagination?.current,
    tableParams.pagination?.pageSize,
    tableParams?.sortOrder,
    tableParams?.sortField,
    JSON.stringify(tableParams.filters),
  ]);

  const handleTableChange = (pagination, filters, sorter) => {
    setTableParams({
      pagination,
      filters,
      sortOrder: Array.isArray(sorter) ? undefined : sorter.order,
      sortField: Array.isArray(sorter) ? undefined : sorter.field,
    });

    // `dataSource` is useless since `pageSize` changed
    if (pagination.pageSize !== tableParams.pagination?.pageSize) {
      setData([]);
    }
  };

  return (
    <Table
      className="transcription-table"
      columns={columns}
      rowKey={(record) => record.login.uuid}
      dataSource={data}
      pagination={tableParams.pagination}
      loading={loading}
      onChange={handleTableChange}
    />
  );
};
export default TranscriptionTable;
