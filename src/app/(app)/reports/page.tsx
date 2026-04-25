"use client";

import { useMemo, useState } from "react";
import { Download, Mic, Send } from "lucide-react";
import { Line, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { SelectBox } from "@/components/ui/SelectBox";
import { mockChartData, mockMaterials } from "@/data/mockData";
import { SummaryCardItem } from "@/components/ui/SummaryCardItem";
import { SectionHeader } from "@/components/ui/SectionHeader";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

type SupportedLocale = "tr" | "en";

type SpeechRecognitionResultItem = {
  transcript: string;
};

type SpeechRecognitionResultLike = {
  0: SpeechRecognitionResultItem;
};

type SpeechRecognitionEventLike = {
  results: ArrayLike<SpeechRecognitionResultLike>;
};

type SpeechRecognitionLike = {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  onstart: (() => void) | null;
  onresult: ((event: SpeechRecognitionEventLike) => void) | null;
  onerror: (() => void) | null;
  onend: (() => void) | null;
  start: () => void;
};

type SpeechRecognitionCtor = new () => SpeechRecognitionLike;

type BrowserWithSpeechRecognition = Window & {
  webkitSpeechRecognition?: SpeechRecognitionCtor;
  SpeechRecognition?: SpeechRecognitionCtor;
};

export default function ReportsPage() {
  const t = useTranslations("reports");
  const common = useTranslations("common");

  const [locale, setLocale] = useState<SupportedLocale>("en");
  const [aiQuery, setAiQuery] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [showAIResponse, setShowAIResponse] = useState(false);
  const [aiResponse, setAiResponse] = useState("");
  const [notice, setNotice] = useState("");

  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [product, setProduct] = useState("all");
  const [orderType, setOrderType] = useState("all");

  const summaryData = [
    { label: t("totalOrders"), value: 156 },
    { label: t("inboundOrders"), value: 89, color: "text-green-600" },
    { label: t("outboundOrders"), value: 67, color: "text-orange-600" },
    { label: t("totalItems"), value: "2,450", color: "text-blue-600" },
  ];

  const lineData = useMemo(
    () => ({
      labels: mockChartData.stockTrend.map((data) => data.name),
      datasets: [
        {
          label: t("stockLevel"),
          data: mockChartData.stockTrend.map((data) => data.stock),
          fill: false,
          borderColor: "#3b82f6",
          tension: 0.1,
        },
      ],
    }),
    [t]
  );

  const barData = useMemo(
    () => ({
      labels: mockChartData.orderVolume.map((data) => data.name),
      datasets: [
        {
          label: t("inbound"),
          data: mockChartData.orderVolume.map((data) => data.inbound),
          backgroundColor: "#10b981",
          borderRadius: 4,
        },
        {
          label: t("outbound"),
          data: mockChartData.orderVolume.map((data) => data.outbound),
          backgroundColor: "#f59e0b",
          borderRadius: 4,
        },
      ],
    }),
    [t]
  );

  const chartOptions = {
    responsive: true,
    scales: {
      x: {
        ticks: {
          color: "#6b7280",
        },
      },
      y: {
        ticks: {
          color: "#6b7280",
        },
      },
    },
    plugins: {
      tooltip: {
        mode: "index" as const,
        intersect: false,
      },
      legend: {
        display: true,
        position: "top" as const,
      },
    },
  };

  const handleExportExcel = () => {
    setNotice(t("exportingExcel"));
  };

  const handleExportPDF = () => {
    setNotice(t("exportingPDF"));
  };

  const handleVoiceInput = () => {
    const speechWindow = window as BrowserWithSpeechRecognition;
    const Recognition =
      speechWindow.webkitSpeechRecognition ?? speechWindow.SpeechRecognition;

    if (!Recognition) {
      setNotice(t("speechUnsupported"));
      return;
    }

    const recognition = new Recognition();
    recognition.lang = locale === "tr" ? "tr-TR" : "en-US";
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => {
      setIsListening(true);
      setNotice(t("listening"));
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0]?.[0]?.transcript ?? "";
      setAiQuery(transcript);
      setIsListening(false);
    };

    recognition.onerror = () => {
      setNotice(t("speechError"));
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  const handleAskAI = () => {
    if (!aiQuery.trim()) {
      setNotice(t("emptyQuestion"));
      return;
    }

    const demoResponses: Record<SupportedLocale, string> = {
      tr: `📊 ${t("demoTitle")}\n\n${t("question")}: ${aiQuery}\n\n${t("demoBodyTr")}`,
      en: `📊 ${t("demoTitle")}\n\n${t("question")}: ${aiQuery}\n\n${t("demoBodyEn")}`,
    };

    setAiResponse(demoResponses[locale]);
    setShowAIResponse(true);
    setNotice("");
  };

  return (
    <div className="p-8 space-y-6">
      <div className="flex items-start justify-between gap-4">
        <SectionHeader title={t("title")} description={t("subtitle")} />
        <div className="w-40">
          <SelectBox
            label={t("language")}
            value={locale}
            onChange={(event) => setLocale(event.target.value as SupportedLocale)}
            className="border-gray-200"
          >
            <option value="en">{t("english")}</option>
            <option value="tr">{t("turkish")}</option>
          </SelectBox>
        </div>
      </div>

      <Card className="p-5 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-2xl">🤖</span>
          <h3 className="text-sm font-semibold text-gray-900">{t("askAssistant")}</h3>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex-1 relative">
            <Input
              value={aiQuery}
              onChange={(event) => setAiQuery(event.target.value)}
              onKeyDown={(event) => event.key === "Enter" && handleAskAI()}
              placeholder={t("askPlaceholder")}
              className="pr-12 bg-white"
            />
            <Button
              onClick={handleVoiceInput}
              disabled={isListening}
              size="sm"
              variant="ghost"
              className={`absolute right-1 top-1/2 -translate-y-1/2 ${isListening ? "text-red-600 animate-pulse" : "text-gray-400 hover:text-blue-600"}`}
            >
              <Mic className="w-4 h-4" />
            </Button>
          </div>
          <Button onClick={handleAskAI} className="bg-blue-600 hover:bg-blue-700 text-white">
            <Send className="w-4 h-4 mr-2" />
            {t("ask")}
          </Button>
        </div>
        {notice && <p className="text-xs text-blue-700 mt-3">{notice}</p>}
      </Card>

      {showAIResponse && (
        <Card className="p-6 bg-white border-2 border-blue-300 shadow-lg">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className="text-3xl">🤖</span>
              <h3 className="text-lg font-semibold text-gray-900">{t("assistantResponse")}</h3>
            </div>
            <Button onClick={() => setShowAIResponse(false)} variant="ghost" size="sm">
              ✕
            </Button>
          </div>
          <div className="whitespace-pre-line text-sm text-gray-700 leading-relaxed">
            {aiResponse}
          </div>
          <div className="mt-4 pt-4 border-t border-gray-200 flex items-center justify-between">
            <span className="text-xs text-gray-500">{t("demoHint")}</span>
            <Button
              onClick={() => {
                setAiQuery("");
                setShowAIResponse(false);
              }}
              size="sm"
              variant="outline"
            >
              {t("newQuestion")}
            </Button>
          </div>
        </Card>
      )}

      <Card className="p-5 bg-white border border-gray-200">
        <h3 className="text-sm font-semibold text-gray-900 mb-4">{t("filters")}</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="text-xs text-gray-600">{t("dateFrom")}</label>
            <Input type="date" className="mt-1.5" value={dateFrom} onChange={(e) => setDateFrom(e.target.value)} />
          </div>
          <div>
            <label className="text-xs text-gray-600">{t("dateTo")}</label>
            <Input type="date" className="mt-1.5" value={dateTo} onChange={(e) => setDateTo(e.target.value)} />
          </div>
          <div>
            <SelectBox
              label={t("product")}
              value={product}
              onChange={(e) => setProduct(e.target.value)}
              className="mt-1.5"
            >
              <option value="all">{t("allProducts")}</option>
              {mockMaterials.map((m) => (
                <option key={m.id} value={m.productCode}>
                  {m.productName}
                </option>
              ))}
            </SelectBox>
          </div>
          <div>
            <SelectBox
              label={t("orderType")}
              value={orderType}
              onChange={(e) => setOrderType(e.target.value)}
              className="mt-1.5"
            >
              <option value="all">{t("allTypes")}</option>
              <option value="inbound">{t("inbound")}</option>
              <option value="outbound">{t("outbound")}</option>
            </SelectBox>
          </div>
        </div>

        <div className="flex items-center gap-3 mt-5 pt-5 border-t border-gray-200">
          <Button onClick={handleExportExcel} variant="outline" size="sm" className="gap-2">
            <Download className="w-4 h-4" />
            {t("exportExcel")}
          </Button>
          <Button onClick={handleExportPDF} variant="outline" size="sm" className="gap-2">
            <Download className="w-4 h-4" />
            {t("exportPDF")}
          </Button>
          {notice && <span className="text-xs text-gray-500">{notice}</span>}
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card className="p-5 bg-white border border-gray-200">
          <h3 className="text-sm font-semibold text-gray-900 mb-4">{t("stockTrend")}</h3>
          <Line data={lineData} options={chartOptions} />
        </Card>

        <Card className="p-5 bg-white border border-gray-200">
          <h3 className="text-sm font-semibold text-gray-900 mb-4">{t("orderVolume")}</h3>
          <Bar data={barData} options={chartOptions} />
        </Card>
      </div>

      <Card className="p-5 bg-white border border-gray-200">
        <h3 className="text-sm font-semibold text-gray-900 mb-4">
          {t("summary")}
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {summaryData.map((item, i) => (
            <SummaryCardItem
              key={i}
              label={item.label}
              value={item.value}
              valueColor={item.color}
            />
          ))}
        </div>
      </Card>
    </div>
  );
}
