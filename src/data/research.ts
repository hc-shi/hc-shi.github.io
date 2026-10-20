import type { Publication, Topic } from "@/types";

export const topics: Topic[] = [
  {
    id: "recursive-reasoning",
    name: "Recursive Reasoning & Test-Time Scaling",
    blurb:
      "Tiny models that reason by iterating one learned update on a latent state, and how to scale their compute at test time.",
    current: true,
  },
  {
    id: "llm-agents",
    name: "LLM Agents & Embodied Learning",
    blurb:
      "Language-model agents that perceive, plan and act in embodied and open-ended worlds, and keep acquiring skills.",
  },
  {
    id: "multimodal",
    name: "Multimodal Understanding & Grounding",
    blurb:
      "Aligning images and videos with language and other modalities, so that models describe, retrieve and reason about what is actually there.",
  },
  {
    id: "robust-learning",
    name: "Robust Learning & Knowledge Extraction",
    blurb: "Learning from scarce, noisy or shifted labels, in vision and in knowledge extraction from text.",
  },
];

// Authors, venues and years verified on 2026-10-19 against publisher DOI records (via OpenAlex)
// and arXiv. "*" = equal contribution (per the CV), "†" = corresponding author (per the project page).
export const publications: Publication[] = [
  // Recursive Reasoning & Test-Time Scaling
  {
    id: "ics",
    title: "Input-Conditioned Search for Efficient Test-Time Scaling of Recursive Reasoners",
    authors: [
      "Haochen Shi", "Tianwen Fu", "Qianggang Ding", "Yinhan Lu", "Yizhan Li",
      "Huan Zhang", "Yajie Zhao", "Xingdi Yuan", "Hengyang Lu†", "Bang Liu†",
    ],
    venue: "Preprint",
    year: 2026,
    topic: "recursive-reasoning",
    representative: true,
    tldr: "Changing the input condition gives a frozen reasoner new update maps to search over. Highest mean accuracy on six reasoning tasks, with up to 100× fewer FLOPs than scaling baselines.",
    links: {
      paper: "https://arxiv.org/abs/2610.18547",
      project: "https://icsearch.github.io/",
      code: "https://github.com/icsearch/ICS",
      weights: "https://huggingface.co/hcshi/ICS",
    },
    emblem: "ics",
  },

  // LLM Agents & Embodied Learning
  {
    id: "psn",
    title: "Evolving Programmatic Skill Networks",
    authors: ["Haochen Shi", "Xingdi Yuan", "Bang Liu"],
    venue: "COLM",
    year: 2026,
    topic: "llm-agents",
    representative: true,
    tldr: "A compositional network of executable skills that an agent keeps refining through experience, with LLM-driven fault localization and maturity-aware gating.",
    links: {
      paper: "https://arxiv.org/abs/2601.03509",
      project: "https://evolving-skill-networks.github.io/",
      code: "https://github.com/evolving-skill-networks/psn",
    },
    emblem: "psn",
  },
  {
    id: "dive",
    title: "Enhancing Agent Learning through World Dynamics Modeling",
    authors: ["Zhiyuan Sun*", "Haochen Shi*", "Marc-Alexandre Côté", "Glen Berseth", "Xingdi Yuan", "Bang Liu"],
    venue: "Findings of EMNLP",
    year: 2024,
    topic: "llm-agents",
    representative: true,
    tldr: "Discover, Verify, and Evolve: the agent extracts world dynamics from a few demonstrations, verifies them, and evolves new ones for the current situation, reaching near-human reward in Crafter.",
    links: {
      paper: "https://aclanthology.org/2024.findings-emnlp.202/",
      code: "https://github.com/ZhiyuuanS/DiVE",
    },
    emblem: "dive",
  },
  {
    id: "foundation-agents",
    title:
      "Advances and Challenges in Foundation Agents: From Brain-Inspired Intelligence to Evolutionary, Collaborative, and Safe Systems",
    authors: [
      "Bang Liu", "Xinfeng Li", "Jiayi Zhang", "Jinlin Wang",
      "Tanjin He", "Sirui Hong", "Hongzhang Liu", "Shaokun Zhang",
      "Kaitao Song", "Kunlun Zhu", "Yuheng Cheng", "Suyuchen Wang",
      "Xiaoqiang Wang", "Yuyu Luo", "Haibo Jin", "Peiyan Zhang",
      "Ollie Liu", "Jiaqi Chen", "Huan Zhang", "Zhaoyang Yu",
      "Haochen Shi", "Boyan Li", "Dekun Wu", "Fengwei Teng",
      "Xiaojun Jia", "Jiawei Xu", "Jinyu Xiang", "Yizhang Lin",
      "Tianming Liu", "Tongliang Liu", "Yu Su", "Huan Sun",
      "Glen Berseth", "Jianyun Nie", "Ian Foster", "Logan Ward",
      "Qingyun Wu", "Yu Gu", "Mingchen Zhuge", "Xinbing Liang",
      "Xiangru Tang", "Haohan Wang", "Jiaxuan You", "Chi Wang",
      "Jian Pei", "Qiang Yang", "Xiaoliang Qi", "Chenglin Wu",
    ],
    venue: "Preprint",
    year: 2025,
    topic: "llm-agents",
    representative: false,
    summary:
      "A survey that maps agent modules such as memory, world models and reward onto brain functions, then covers self-evolution, multi-agent collaboration and safety.",
    links: { paper: "https://arxiv.org/abs/2504.01990" },
  },
  {
    id: "tradexpert",
    title: "TradExpert: Revolutionizing Trading with Mixture of Expert LLMs",
    authors: ["Qianggang Ding", "Haochen Shi", "Jiadong Guo", "Bang Liu"],
    venue: "ICLR Workshop",
    year: 2025,
    topic: "llm-agents",
    representative: false,
    summary: "Specialized LLM experts for news, prices, alpha factors and fundamentals, combined for trading.",
    links: { paper: "https://arxiv.org/abs/2411.00782" },
  },
  {
    id: "opex",
    title: "OPEx: A Component-Wise Analysis of LLM-Centric Agents in Embodied Instruction Following",
    authors: ["Haochen Shi", "Zhiyuan Sun", "Xingdi Yuan", "Marc-Alexandre Côté", "Bang Liu"],
    venue: "ACL",
    year: 2024,
    venueNote: "AAMAS 2024 extended abstract",
    topic: "llm-agents",
    representative: false,
    summary:
      "Splits an embodied agent into Observer, Planner and Executor to find which component actually limits instruction following.",
    links: { paper: "https://aclanthology.org/2024.acl-long.37/" },
  },
  {
    id: "digital-detectives",
    title:
      "Deciphering Digital Detectives: Understanding LLM Behaviors and Capabilities in Multi-Agent Mystery Games",
    authors: ["Dekun Wu*", "Haochen Shi*", "Zhiyuan Sun", "Bang Liu"],
    venue: "Findings of ACL",
    year: 2024,
    topic: "llm-agents",
    representative: false,
    summary: "A multi-agent framework and dataset for Jubensha detective games, with metrics for LLM reasoning.",
    links: {
      paper: "https://aclanthology.org/2024.findings-acl.490/",
      code: "https://github.com/jackwu502/ThinkThrice",
    },
  },

  // Multimodal Understanding & Grounding
  {
    id: "consensus-graph",
    title: "Consensus Graph Representation Learning for Better Grounded Image Captioning",
    authors: ["Wenqiao Zhang*", "Haochen Shi*", "Siliang Tang", "Jun Xiao", "Qiang Yu", "Yueting Zhuang"],
    venue: "AAAI",
    year: 2021,
    topic: "multimodal",
    representative: true,
    tldr: "Learns a consensus between an image's scene graph and its caption's language graph, so the captioner names objects that are actually there. Object hallucination drops by 9%.",
    links: { paper: "https://doi.org/10.1609/aaai.v35i4.16452" },
    emblem: "consensus",
  },
  {
    id: "radar",
    title: "Robust Modality-Incomplete Anomaly Detection: A Modality-Instructive Framework with Benchmark",
    authors: [
      "Bingchen Miao", "Wenqiao Zhang", "Juncheng Li", "Wangyu Wu", "Siliang Tang",
      "Zhaocheng Li", "Haochen Shi", "Jun Xiao", "Yueting Zhuang",
    ],
    venue: "ACM MM",
    year: 2025,
    topic: "multimodal",
    representative: false,
    summary:
      "The first study of industrial anomaly detection when the RGB image or the 3D point cloud may be missing, with a benchmark and a modality-instructive two-stage framework.",
    links: { paper: "https://doi.org/10.1145/3746027.3754766" },
  },
  {
    id: "magic",
    title:
      "MAGIC: Multimodal relAtional Graph adversarIal inferenCe for Diverse and Unpaired Text-based Image Captioning",
    authors: [
      "Wenqiao Zhang*", "Haochen Shi*", "Jiannan Guo*", "Shengyu Zhang",
      "Qingpeng Cai", "Juncheng Li", "Sihui Luo", "Yueting Zhuang",
    ],
    venue: "AAAI",
    year: 2022,
    topic: "multimodal",
    representative: false,
    summary:
      "Diverse captions for images that contain text, learned without any image–caption pairs through adversarial inference over multimodal relational graphs.",
    links: { paper: "https://doi.org/10.1609/aaai.v36i3.20243" },
  },
  {
    id: "temporal-emotion",
    title:
      "Dilated Context Integrated Network with Cross-Modal Consensus for Temporal Emotion Localization in Videos",
    authors: [
      "Juncheng Li", "Junlin Xie", "Linchao Zhu", "Long Qian", "Siliang Tang", "Wenqiao Zhang",
      "Haochen Shi", "Shengyu Zhang", "Longhui Wei", "Qi Tian", "Yueting Zhuang",
    ],
    venue: "ACM MM",
    year: 2022,
    topic: "multimodal",
    representative: false,
    summary:
      "Introduces temporal emotion localization: finding when each emotion occurs in an untrimmed video with subtitles, with a coarse-fine two-stream network over visual and textual cues.",
    links: { paper: "https://doi.org/10.1145/3503161.3547886" },
  },
  {
    id: "boss",
    title:
      "BOSS: Bottom-up Cross-modal Semantic Composition with Hybrid Counterfactual Training for Robust Content-based Image Retrieval",
    authors: [
      "Wenqiao Zhang", "Jiannan Guo", "Mengze Li", "Haochen Shi",
      "Shengyu Zhang", "Juncheng Li", "Siliang Tang", "Yueting Zhuang",
    ],
    venue: "Preprint",
    year: 2022,
    topic: "multimodal",
    representative: false,
    summary:
      "Finds a target image from a reference image plus text describing the change, composing visual and textual semantics bottom-up and training with hybrid counterfactual examples.",
    links: { paper: "https://arxiv.org/abs/2207.04211" },
  },
  {
    id: "ahgr",
    title: "Adaptive Hierarchical Graph Reasoning with Semantic Coherence for Video-and-Language Inference",
    authors: [
      "Juncheng Li", "Siliang Tang", "Linchao Zhu", "Haochen Shi",
      "Xuanwen Huang", "Fei Wu", "Yi Yang", "Yueting Zhuang",
    ],
    venue: "ICCV",
    year: 2021,
    topic: "multimodal",
    representative: false,
    summary:
      "Decides whether a statement is entailed by a video and its subtitles, reasoning over a hierarchical graph with semantic coherence.",
    links: {
      paper:
        "https://openaccess.thecvf.com/content/ICCV2021/html/Li_Adaptive_Hierarchical_Graph_Reasoning_With_Semantic_Coherence_for_Video-and-Language_Inference_ICCV_2021_paper.html",
    },
  },
  {
    id: "gvd",
    title: "Relational Graph Learning for Grounded Video Description Generation",
    authors: [
      "Wenqiao Zhang", "Xin Eric Wang", "Siliang Tang", "Haizhou Shi",
      "Haochen Shi", "Jun Xiao", "Yueting Zhuang", "William Yang Wang",
    ],
    venue: "ACM MM",
    year: 2020,
    topic: "multimodal",
    representative: false,
    summary:
      "A language-refined scene graph supplies fine-grained objects and relations, giving more accurate grounded video descriptions.",
    links: { paper: "https://doi.org/10.1145/3394171.3413746" },
  },

  // Robust Learning & Knowledge Extraction
  {
    id: "ssal",
    title:
      "Semi-supervised Active Learning for Semi-supervised Models: Exploit Adversarial Examples with Graph-based Virtual Labels",
    authors: [
      "Jiannan Guo*", "Haochen Shi*", "Yangyang Kang", "Kun Kuang", "Siliang Tang",
      "Zhuoren Jiang", "Changlong Sun", "Fei Wu", "Yueting Zhuang",
    ],
    venue: "ICCV",
    year: 2021,
    topic: "robust-learning",
    representative: true,
    tldr: "Label propagation over a graph gives unlabeled samples virtual labels; adversarial examples then reveal which samples sit near cluster boundaries and are worth annotating. Semi-supervised and active learning improve each other in a closed loop.",
    links: {
      paper:
        "https://openaccess.thecvf.com/content/ICCV2021/html/Guo_Semi-Supervised_Active_Learning_for_Semi-Supervised_Models_Exploit_Adversarial_Examples_With_ICCV_2021_paper.html",
    },
    emblem: "ssal",
  },
  {
    id: "aria",
    title:
      "Reasoning Makes Good Annotators: An Automatic Task-specific Rules Distilling Framework for Low-resource Relation Extraction",
    authors: ["Yilin Lu", "Juncheng Li", "Xiaoqiang Wang", "Haochen Shi", "Tao Chen", "Siliang Tang"],
    venue: "Findings of EMNLP",
    year: 2023,
    topic: "robust-learning",
    representative: false,
    summary:
      "A pre-trained language model reasons out task-specific labeling rules and composes them into robust compound rules, replacing hand-written rules for low-resource relation extraction.",
    links: { paper: "https://aclanthology.org/2023.findings-emnlp.499/" },
  },
  {
    id: "coat",
    title: "Empower Distantly Supervised Relation Extraction with Collaborative Adversarial Training",
    authors: ["Tao Chen*", "Haochen Shi*", "Liyuan Liu", "Siliang Tang", "Jian Shao", "Zhigang Chen", "Yueting Zhuang"],
    venue: "AAAI",
    year: 2021,
    topic: "robust-learning",
    representative: false,
    summary:
      "Recycles the training instances that multi-instance learning discards, by coordinating virtual adversarial training and adversarial training.",
    links: { paper: "https://doi.org/10.1609/aaai.v35i14.17501" },
  },
  {
    id: "vat",
    title: "Alleviate Dataset Shift Problem in Fine-grained Entity Typing with Virtual Adversarial Training",
    authors: ["Haochen Shi", "Siliang Tang", "Xiaotao Gu", "Bo Chen", "Zhigang Chen", "Jian Shao", "Xiang Ren"],
    venue: "IJCAI",
    year: 2020,
    topic: "robust-learning",
    representative: false,
    summary:
      "Distantly supervised training data differs systematically from the human-annotated test set; a virtual adversarial training regularizer makes fine-grained entity typing robust to this shift.",
    links: { paper: "https://www.ijcai.org/proceedings/2020/539" },
  },
];
