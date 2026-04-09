const APP_DATA = {
  company: "K&K Industries",
  reportTitle: "MULTI-JOB WEEKLY SITE POSITION",
  reportDate: "2026-04-08",
  updatedDate: "2026-04-08",

  jobs: [

    {
      id: "caltex-daguilar",
      name: "Caltex D'Aguilar",
      weekEnding: "2026-04-08",
      reportDate: "2026-04-08",

      status: "at-risk",
      statusLabel: "AT RISK",
      lastWeekStatus: "monitor",

      plannedCompletion: "2026-08-15",
      forecastCompletion: "2026-09-02",
      bufferDays: -18,
      programmeConfidence: "requires-recovery",
      programmeConfidenceLabel: "REQUIRES RECOVERY",

      contractValue: 2400000,
      approvedVariations: 35000,
      pendingVariations: 80000,
      forecastFinal: 2435000,

      holdingUp: "Programme marked Behind with no defined cause or recovery plan. Critical path not clearly established.",
      criticalPath: "Slab footing concrete pour → structural frame",
      labour: "adequate",
      labourLabel: "ADEQUATE",
      confidence: "low",
      confidenceLabel: "LOW — Incomplete daily logs",

      escalations: [
        "Define delay cause and issue recovery plan this week",
        "SM to complete all structured daily log fields — no N/A entries"
      ],

      managerNote: "Site progressing physically but reporting is weak. Programme risk exists due to lack of clarity, not lack of activity.",

      reality: "Active site with trades working across the week. Under slab plumbing and grease trap complete. Council inspection passed. Footing steel placed ready for pour. Job marked Behind but no cause recorded. Reporting gaps are driving risk.",
      nextAction: "1. Confirm pour completion.\n2. Define real critical path.\n3. Enforce daily log completion discipline.",

      dataGaps: "Incomplete logs",
      dataGapDetail: "Planned vs Completed missing · No delay cause · Critical path unclear",
      latestDailyLog: "2026-04-08",

      weeklyLog: [
        { day: "Early week", activity: "Under slab plumbing and grease trap completed. Council inspection passed." },
        { day: "Mid week", activity: "Footing steel placed." },
        { day: "End week", activity: "Concrete pour prepared. Programme marked Behind without explanation." }
      ]
    },

    {
      id: "pearl-energy-childers",
      name: "Pearl Energy Childers",
      weekEnding: "2026-04-08",
      reportDate: "2026-04-08",

      status: "at-risk",
      statusLabel: "AT RISK",
      lastWeekStatus: "monitor",

      plannedCompletion: "2026-06-30",
      forecastCompletion: "2026-07-21",
      bufferDays: -21,
      programmeConfidence: "requires-recovery",
      programmeConfidenceLabel: "REQUIRES RECOVERY",

      contractValue: 1850000,
      approvedVariations: 0,
      pendingVariations: 0,
      forecastFinal: 1850000,

      holdingUp: "Concreting contractor failing to mobilise — repeated no-shows impacting programme.",
      criticalPath: "Civil works → concrete pour",
      labour: "insufficient",
      labourLabel: "INSUFFICIENT",
      confidence: "medium",
      confidenceLabel: "MEDIUM — Logs reliable",

      escalations: [
        "Decision required: replace contractor or accept delay",
        "Lock procurement packages immediately"
      ],

      managerNote: "Site is ready — issue is contractor reliability. Delay is avoidable with immediate action.",

      reality: "Site prepared and materials ready. Civil works largely complete. Concreting contractor failed to attend multiple times. Programme risk increasing due to inactivity.",
      nextAction: "1. Replace or confirm contractor immediately.\n2. Issue catch-up programme.\n3. Lock procurement.",

      dataGaps: null,
      dataGapDetail: "Logs complete and structured",
      latestDailyLog: "2026-04-08",

      weeklyLog: [
        { day: "Early week", activity: "Civil works nearing completion. Site prepared for next stage." },
        { day: "Mid week", activity: "No labour onsite despite confirmed works." },
        { day: "End week", activity: "Contractor still not mobilised. Programme slipping." }
      ]
    },

    {
      id: "exus-williamstown",
      name: "Exus Williamstown",
      weekEnding: "2026-04-08",
      reportDate: "2026-04-08",

      status: "unknown",
      statusLabel: "DATA GAPS",
      lastWeekStatus: "on-track",

      plannedCompletion: null,
      forecastCompletion: null,
      bufferDays: null,
      programmeConfidence: "unknown",
      programmeConfidenceLabel: "UNKNOWN",

      contractValue: null,
      approvedVariations: null,
      pendingVariations: null,
      forecastFinal: null,

      holdingUp: "No daily logs submitted — site position cannot be verified.",
      criticalPath: "Unknown",
      labour: "unknown",
      labourLabel: "UNKNOWN",
      confidence: "low",
      confidenceLabel: "LOW — No logs",

      escalations: [
        "SM to submit all missing logs immediately"
      ],

      managerNote: "Reporting failure — job cannot be assessed.",

      reality: "No data available for the week. Activity, labour and programme status unknown.",
      nextAction: "1. Submit logs.\n2. Confirm programme.\n3. Reassess job position.",

      dataGaps: "No daily logs",
      dataGapDetail: "Full week missing",
      latestDailyLog: null,

      weeklyLog: [
        { day: "Full week", activity: "No logs submitted." }
      ]
    },

    {
      id: "pearl-energy-emerald",
      name: "Pearl Energy Emerald",
      weekEnding: "2026-04-08",
      reportDate: "2026-04-08",

      status: "on-track",
      statusLabel: "ON TRACK",
      lastWeekStatus: "monitor",

      plannedCompletion: null,
      forecastCompletion: null,
      bufferDays: null,
      programmeConfidence: "stable",
      programmeConfidenceLabel: "STABLE",

      contractValue: null,
      approvedVariations: null,
      pendingVariations: null,
      forecastFinal: null,

      holdingUp: "No immediate constraints identified",
      criticalPath: "Civil → concrete transition",
      labour: "adequate",
      labourLabel: "ADEQUATE",
      confidence: "high",
      confidenceLabel: "HIGH",

      escalations: [],

      managerNote: "Clean job — steady progress and good reporting.",

      reality: "Consistent site activity with aligned planning and execution. No major issues identified.",
      nextAction: "Maintain momentum and ensure next phase is resourced.",

      dataGaps: null,
      dataGapDetail: "Minimal",
      latestDailyLog: "2026-04-08",

      weeklyLog: [
        { day: "Week", activity: "Works progressing steadily with no major disruption." }
      ]
    }

  ]
};
