import Invoice from "../models/invoice.model.js";
import mongoose from "mongoose";

export const getDashboardSummary = async (req, res) => {
  try {
    const totalRevenue = await Invoice.aggregate([
      { $match: { status: "Paid" } },
      { $group: { _id: null, total: { $sum: "$total" } } },
    ]);

    const pendingAmount = await Invoice.aggregate([
      { $match: { status: { $in: ["Sent", "Viewed", "Unpaid"] } } },
      { $group: { _id: null, total: { $sum: "$total" } } },
    ]);

    const overdueAmount = await Invoice.aggregate([
      { $match: { status: "Overdue" } },
      { $group: { _id: null, total: { $sum: "$total" } } },
    ]);

    res.json({
      totalRevenue: totalRevenue[0]?.total || 0,
      pendingAmount: pendingAmount[0]?.total || 0,
      overdueAmount: overdueAmount[0]?.total || 0,
    });
  } catch (error) {
    console.error("Dashboard Summary Error:", error);
    res.status(500).json({ error: error.message });
  }
};


export const getMonthlyRevenue = async (req, res) => {
  try {
    const data = await Invoice.aggregate([
      { $match: { status: "Paid" } },
      {
        $group: {
          _id: { $month: "$createdAt" },
          revenue: { $sum: "$total" },
        },
      },
      { $sort: { "_id": 1 } },
    ]);

    res.json(data);
  } catch (error) {
    console.error("Monthly Revenue Error:", error);
    res.status(500).json({ error: error.message });
  }
};

export const getStatusDistribution = async (req, res) => {
  try {
    const data = await Invoice.aggregate([
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
        },
      },
    ]);

    res.json(data);
  } catch (error) {
    console.error("Status Distribution Error:", error);
    res.status(500).json({ error: error.message });
  }
};