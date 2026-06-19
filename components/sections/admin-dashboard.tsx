"use client";

import React, { useState, useEffect } from "react";
import { Plus, Trash, Eye, EyeOff, Upload, Save, FileText, LayoutDashboard, ShoppingBag, FolderHeart, Users, HelpCircle, ArrowLeft, LogOut, Pencil } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/lib/store/useAuthStore";
import { urlFor } from "@/sanity/lib/image";

interface AdminDashboardProps {
  locale: string;
  initialBanners: any[];
  initialCategories: any[];
  initialProducts: any[];
  initialConsultations: any[];
  initialAstrologers: any[];
}

type TabType = "banners" | "categories" | "products" | "consultations" | "astrologers";

export function AdminDashboard({
  locale,
  initialBanners,
  initialCategories,
  initialProducts,
  initialConsultations,
  initialAstrologers
}: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState<TabType>("banners");
  const { logout } = useAuthStore();

  // Keep-alive to prevent database cold-start timeouts and refresh auth cookies
  useEffect(() => {
    // Initial warm-up ping
    fetch("/api/auth/session").catch(() => {});

    // Periodic ping every 4 minutes (before token expires or DB goes to sleep)
    const interval = setInterval(() => {
      fetch("/api/auth/session").catch(() => {});
    }, 4 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  const handleAdminLogout = async () => {
    await logout();
    window.location.href = `/${locale}/sign-in`;
  };
  
  // Data states
  const [banners, setBanners] = useState(initialBanners);
  const [categories, setCategories] = useState(initialCategories);
  const [products, setProducts] = useState(initialProducts);
  const [consultations, setConsultations] = useState(initialConsultations);
  const [astrologers, setAstrologers] = useState(initialAstrologers);

  // Group products by category dynamically with search filtering & category tabs
  const [productSearch, setProductSearch] = useState("");
  const [debouncedProductSearch, setDebouncedProductSearch] = useState("");
  const [selectedProductCategory, setSelectedProductCategory] = useState<string>("All");

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedProductSearch(productSearch);
    }, 250);
    return () => clearTimeout(handler);
  }, [productSearch]);

  // Filtered products list
  const filteredProducts = products.filter((p: any) => {
    const matchesSearch = 
      !debouncedProductSearch || 
      p.name?.toLowerCase().includes(debouncedProductSearch.toLowerCase()) || 
      (p.description && p.description.toLowerCase().includes(debouncedProductSearch.toLowerCase()));
    return matchesSearch;
  });

  // Group filtered products by category
  const filteredProductsByCategory: Record<string, any[]> = {};
  filteredProducts.forEach((product: any) => {
    const categoryName = product.category?.name || "Uncategorized";
    if (!filteredProductsByCategory[categoryName]) {
      filteredProductsByCategory[categoryName] = [];
    }
    filteredProductsByCategory[categoryName].push(product);
  });

  // All unique category names from original products list (to display as tabs)
  const uniqueProductCategories = ["All", ...Array.from(new Set(products.map((p: any) => p.category?.name || "Uncategorized").filter(Boolean)))];

  // Upload states
  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Form states
  const [bannerForm, setBannerForm] = useState({ title: "", link: "", sequence: 0, imageAssetId: "" });
  const [bannerPreview, setBannerPreview] = useState("");
  const [editingBannerId, setEditingBannerId] = useState<string | null>(null);

  const [categoryForm, setCategoryForm] = useState({ name: "", description: "", imageAssetId: "" });
  const [categoryPreview, setCategoryPreview] = useState("");
  const [editingCategoryId, setEditingCategoryId] = useState<string | null>(null);

  const [productForm, setProductForm] = useState({
    name: "",
    description: "",
    price: 0,
    salePrice: "",
    priceBasic: "",
    salePriceBasic: "",
    priceSemiPremium: "",
    salePriceSemiPremium: "",
    pricePremium: "",
    salePricePremium: "",
    isBestSelling: false,
    carats: "",
    categoryId: "",
    imageAssetId: ""
  });

  const selectedCategory = categories.find(cat => cat._id === productForm.categoryId);
  const isGemstone = selectedCategory?.slug?.current?.toLowerCase().includes("gemstone") || 
                    selectedCategory?.name?.toLowerCase().includes("gemstone") || 
                    selectedCategory?.name?.toLowerCase().includes("gem");
  const [productPreview, setProductPreview] = useState("");
  const [editingProductId, setEditingProductId] = useState<string | null>(null);

  const [consultationForm, setConsultationForm] = useState({ title: "", description: "", imageAssetId: "" });
  const [consultationPreview, setConsultationPreview] = useState("");
  const [editingConsultationId, setEditingConsultationId] = useState<string | null>(null);

  const [astrologerForm, setAstrologerForm] = useState({ name: "", bio: "", photoAssetId: "", specializations: "", languages: "", baseFee: 0, consultationCategoryId: "" });
  const [astrologerPreview, setAstrologerPreview] = useState("");
  const [editingAstrologerId, setEditingAstrologerId] = useState<string | null>(null);

  // Edit Initiator helpers
  const handleStartEditBanner = (item: any) => {
    setEditingBannerId(item._id);
    setBannerForm({
      title: item.title || "",
      link: item.link || "",
      sequence: item.sequence || 0,
      imageAssetId: item.image?.asset?._ref || ""
    });
    let imgUrl = "";
    if (item.image) {
      try {
        imgUrl = urlFor(item.image).url();
      } catch (e) {
        imgUrl = item.image?.asset?.url || "";
      }
    }
    setBannerPreview(imgUrl);
  };

  const handleStartEditCategory = (item: any) => {
    setEditingCategoryId(item._id);
    setCategoryForm({
      name: item.name || "",
      description: item.description || "",
      imageAssetId: item.image?.asset?._ref || ""
    });
    let imgUrl = "";
    if (item.image) {
      try {
        imgUrl = urlFor(item.image).url();
      } catch (e) {
        imgUrl = item.image?.asset?.url || "";
      }
    }
    setCategoryPreview(imgUrl);
  };

  const handleStartEditProduct = (item: any) => {
    setEditingProductId(item._id);
    setProductForm({
      name: item.name || "",
      description: item.description || "",
      price: item.price || 0,
      salePrice: item.salePrice ? String(item.salePrice) : "",
      priceBasic: item.priceBasic ? String(item.priceBasic) : "",
      salePriceBasic: item.salePriceBasic ? String(item.salePriceBasic) : "",
      priceSemiPremium: item.priceSemiPremium ? String(item.priceSemiPremium) : "",
      salePriceSemiPremium: item.salePriceSemiPremium ? String(item.salePriceSemiPremium) : "",
      pricePremium: item.pricePremium ? String(item.pricePremium) : "",
      salePricePremium: item.salePricePremium ? String(item.salePricePremium) : "",
      isBestSelling: !!item.isBestSelling,
      carats: item.carats ? String(item.carats) : "",
      categoryId: item.category?._id || "",
      imageAssetId: item.image?.asset?._ref || ""
    });
    let imgUrl = "";
    if (item.image) {
      try {
        imgUrl = urlFor(item.image).url();
      } catch (e) {
        imgUrl = item.image?.asset?.url || "";
      }
    }
    setProductPreview(imgUrl);
  };

  const handleStartEditConsultation = (item: any) => {
    setEditingConsultationId(item._id);
    setConsultationForm({
      title: item.title || "",
      description: item.description || "",
      imageAssetId: item.image?.asset?._ref || ""
    });
    let imgUrl = "";
    if (item.image) {
      try {
        imgUrl = urlFor(item.image).url();
      } catch (e) {
        imgUrl = item.image?.asset?.url || "";
      }
    }
    setConsultationPreview(imgUrl);
  };

  const handleStartEditAstrologer = (item: any) => {
    setEditingAstrologerId(item._id);
    setAstrologerForm({
      name: item.name || "",
      bio: item.bio || "",
      photoAssetId: item.photo?.asset?._ref || "",
      specializations: item.specializations?.join(", ") || "",
      languages: item.languages?.join(", ") || "",
      baseFee: item.baseFee || 0,
      consultationCategoryId: item.consultationCategory?._id || ""
    });
    let imgUrl = "";
    if (item.photo) {
      try {
        imgUrl = urlFor(item.photo).url();
      } catch (e) {
        imgUrl = item.photo?.asset?.url || "";
      }
    }
    setAstrologerPreview(imgUrl);
  };

  // Handle image upload to API
  const handleImageUpload = async (file: File, setAssetId: (id: string) => void, setPreview: (url: string) => void) => {
    if (!file) return;
    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData
      });
      const data = await res.json();
      if (data.success && data.asset?._id) {
        setAssetId(data.asset._id);
        setPreview(data.asset.url);
        toast.success("Image uploaded successfully!");
      } else {
        toast.error(data.error || "Failed to upload image.");
      }
    } catch (e) {
      toast.error("Upload error encountered.");
    } finally {
      setUploading(false);
    }
  };

  // Toggle show/hide (isActive) state
  const handleToggleActive = async (id: string, currentActive: boolean, tab: TabType) => {
    try {
      const res = await fetch("/api/admin/write", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "toggleActive", id, currentActive })
      });
      const data = await res.json();

      if (data.success) {
        toast.success("Visibility updated!");
        // Update local state list
        const updateList = (list: any[]) => list.map(item => item._id === id ? { ...item, isActive: !currentActive } : item);
        if (tab === "banners") setBanners(updateList);
        if (tab === "categories") setCategories(updateList);
        if (tab === "products") setProducts(updateList);
        if (tab === "consultations") setConsultations(updateList);
        if (tab === "astrologers") setAstrologers(updateList);
      } else {
        toast.error(data.error || "Toggle failed.");
      }
    } catch (e) {
      toast.error("Visibility toggle request failed.");
    }
  };

  // Delete document
  const handleDelete = async (id: string, tab: TabType) => {
    if (!confirm("Are you sure you want to delete this item?")) return;

    try {
      const res = await fetch("/api/admin/write", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "delete", id })
      });
      const data = await res.json();

      if (data.success) {
        toast.success("Item deleted successfully!");
        const filterList = (list: any[]) => list.filter(item => item._id !== id);
        if (tab === "banners") setBanners(filterList);
        if (tab === "categories") setCategories(filterList);
        if (tab === "products") setProducts(filterList);
        if (tab === "consultations") setConsultations(filterList);
        if (tab === "astrologers") setAstrologers(filterList);
      } else {
        toast.error(data.error || "Delete failed.");
      }
    } catch (e) {
      toast.error("Deletion request failed.");
    }
  };

  // Form Submissions
  const handleAddBanner = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!bannerForm.title || !bannerForm.imageAssetId) {
      toast.error("Please provide a title and upload a banner image.");
      return;
    }
    setSubmitting(true);

    const doc: any = {
      title: bannerForm.title,
      link: bannerForm.link || undefined,
      sequence: Number(bannerForm.sequence),
      image: {
        _type: "image",
        asset: {
          _type: "reference",
          _ref: bannerForm.imageAssetId
        }
      }
    };

    try {
      const res = await fetch("/api/admin/write", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: editingBannerId ? "patch" : "create",
          id: editingBannerId || undefined,
          doc: editingBannerId ? doc : { ...doc, _type: "banner", isActive: true }
        })
      });
      const data = await res.json();

      if (data.success) {
        toast.success(editingBannerId ? "Ad Banner updated!" : "Ad Banner created!");
        if (editingBannerId) {
          setBanners(banners.map(b => b._id === editingBannerId ? { ...b, ...doc, image: { asset: { url: bannerPreview, _ref: bannerForm.imageAssetId } } } : b));
          setEditingBannerId(null);
        } else {
          setBanners([...banners, { ...data.result, image: { asset: { url: bannerPreview, _ref: bannerForm.imageAssetId } } }]);
        }
        setBannerForm({ title: "", link: "", sequence: 0, imageAssetId: "" });
        setBannerPreview("");
      } else {
        toast.error(data.error || "Failed to save banner.");
      }
    } catch (e) {
      toast.error("Save failed.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleAddCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!categoryForm.name) {
      toast.error("Category name is required.");
      return;
    }
    setSubmitting(true);

    const doc: any = {
      name: categoryForm.name,
      slug: {
        _type: "slug",
        current: categoryForm.name.toLowerCase().replace(/\s+/g, "-")
      },
      description: categoryForm.description || undefined,
      image: categoryForm.imageAssetId ? {
        _type: "image",
        asset: {
          _type: "reference",
          _ref: categoryForm.imageAssetId
        }
      } : null
    };

    try {
      const res = await fetch("/api/admin/write", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: editingCategoryId ? "patch" : "create",
          id: editingCategoryId || undefined,
          doc: editingCategoryId ? doc : { ...doc, _type: "category", isActive: true }
        })
      });
      const data = await res.json();

      if (data.success) {
        toast.success(editingCategoryId ? "Category updated!" : "Category created!");
        if (editingCategoryId) {
          setCategories(categories.map(c => c._id === editingCategoryId ? { ...c, ...doc, image: categoryForm.imageAssetId ? { asset: { url: categoryPreview, _ref: categoryForm.imageAssetId } } : null } : c));
          setEditingCategoryId(null);
        } else {
          setCategories([...categories, { ...data.result, image: categoryForm.imageAssetId ? { asset: { url: categoryPreview, _ref: categoryForm.imageAssetId } } : null }]);
        }
        setCategoryForm({ name: "", description: "", imageAssetId: "" });
        setCategoryPreview("");
      } else {
        toast.error(data.error || "Failed to save category.");
      }
    } catch (e) {
      toast.error("Save failed.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    const hasRequiredPrice = isGemstone ? !!productForm.priceBasic : !!productForm.price;
    if (!productForm.name || !hasRequiredPrice || !productForm.categoryId || !productForm.imageAssetId) {
      toast.error(isGemstone 
        ? "Fill required fields: Name, Category, Basic Price, and Product Image." 
        : "Fill required fields: Name, Category, Base Price, and Product Image."
      );
      return;
    }

    // Validate non-negative prices and sale price restrictions
    if (isGemstone) {
      const basic = Number(productForm.priceBasic);
      const saleBasic = productForm.salePriceBasic ? Number(productForm.salePriceBasic) : null;
      const semi = productForm.priceSemiPremium ? Number(productForm.priceSemiPremium) : null;
      const saleSemi = productForm.salePriceSemiPremium ? Number(productForm.salePriceSemiPremium) : null;
      const prem = productForm.pricePremium ? Number(productForm.pricePremium) : null;
      const salePrem = productForm.salePricePremium ? Number(productForm.salePricePremium) : null;

      if (basic < 0 || (saleBasic !== null && saleBasic < 0) || (semi !== null && semi < 0) || (saleSemi !== null && saleSemi < 0) || (prem !== null && prem < 0) || (salePrem !== null && salePrem < 0)) {
        toast.error("Prices cannot be negative.");
        return;
      }

      if (saleBasic !== null && saleBasic > basic) {
        toast.error("Basic sale price cannot exceed the basic base price.");
        return;
      }
      if (semi !== null && saleSemi !== null && saleSemi > semi) {
        toast.error("Semi-Premium sale price cannot exceed the semi-premium base price.");
        return;
      }
      if (prem !== null && salePrem !== null && salePrem > prem) {
        toast.error("Premium sale price cannot exceed the premium base price.");
        return;
      }
    } else {
      const price = Number(productForm.price);
      const salePrice = productForm.salePrice ? Number(productForm.salePrice) : null;
      if (price < 0 || (salePrice !== null && salePrice < 0)) {
        toast.error("Price cannot be negative.");
        return;
      }
      if (salePrice !== null && salePrice > price) {
        toast.error("Sale price cannot exceed the base price.");
        return;
      }
    }

    setSubmitting(true);

    const doc: any = {
      name: productForm.name,
      slug: {
        _type: "slug",
        current: productForm.name.toLowerCase().replace(/\s+/g, "-")
      },
      description: productForm.description || undefined,
      price: isGemstone ? Number(productForm.priceBasic) : Number(productForm.price),
      salePrice: isGemstone
        ? (productForm.salePriceBasic ? Number(productForm.salePriceBasic) : null)
        : (productForm.salePrice ? Number(productForm.salePrice) : null),
      priceBasic: isGemstone && productForm.priceBasic ? Number(productForm.priceBasic) : null,
      salePriceBasic: isGemstone && productForm.salePriceBasic ? Number(productForm.salePriceBasic) : null,
      priceSemiPremium: isGemstone && productForm.priceSemiPremium ? Number(productForm.priceSemiPremium) : null,
      salePriceSemiPremium: isGemstone && productForm.salePriceSemiPremium ? Number(productForm.salePriceSemiPremium) : null,
      pricePremium: isGemstone && productForm.pricePremium ? Number(productForm.pricePremium) : null,
      salePricePremium: isGemstone && productForm.salePricePremium ? Number(productForm.salePricePremium) : null,
      isBestSelling: !!productForm.isBestSelling,
      carats: productForm.carats ? Number(productForm.carats) : null,
      category: {
        _type: "reference",
        _ref: productForm.categoryId
      },
      image: {
        _type: "image",
        asset: {
          _type: "reference",
          _ref: productForm.imageAssetId
        }
      }
    };

    try {
      const res = await fetch("/api/admin/write", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: editingProductId ? "patch" : "create",
          id: editingProductId || undefined,
          doc: editingProductId ? doc : { ...doc, _type: "product", isActive: true }
        })
      });
      const data = await res.json();

      if (data.success) {
        toast.success(editingProductId ? "Product updated!" : "Product created!");
        const matchedCategory = categories.find(cat => cat._id === productForm.categoryId);
        const resolvedCategory = matchedCategory ? { _id: matchedCategory._id, name: matchedCategory.name } : null;

        if (editingProductId) {
          setProducts(products.map(p => p._id === editingProductId ? { ...p, ...doc, category: resolvedCategory, image: { asset: { url: productPreview, _ref: productForm.imageAssetId } } } : p));
          setEditingProductId(null);
        } else {
          setProducts([...products, { ...data.result, category: resolvedCategory, image: { asset: { url: productPreview, _ref: productForm.imageAssetId } } }]);
        }
        setProductForm({ 
          name: "", 
          description: "", 
          price: 0, 
          salePrice: "", 
          priceBasic: "", 
          salePriceBasic: "", 
          priceSemiPremium: "", 
          salePriceSemiPremium: "", 
          pricePremium: "", 
          salePricePremium: "", 
          isBestSelling: false,
          carats: "", 
          categoryId: "", 
          imageAssetId: "" 
        });
        setProductPreview("");
      } else {
        toast.error(data.error || "Failed to save product.");
      }
    } catch (e) {
      toast.error("Save failed.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleAddConsultation = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!consultationForm.title) {
      toast.error("Service Title is required.");
      return;
    }
    setSubmitting(true);

    const doc: any = {
      title: consultationForm.title,
      slug: {
        _type: "slug",
        current: consultationForm.title.toLowerCase().replace(/\s+/g, "-")
      },
      description: consultationForm.description || undefined,
      image: consultationForm.imageAssetId ? {
        _type: "image",
        asset: {
          _type: "reference",
          _ref: consultationForm.imageAssetId
        }
      } : null
    };

    try {
      const res = await fetch("/api/admin/write", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: editingConsultationId ? "patch" : "create",
          id: editingConsultationId || undefined,
          doc: editingConsultationId ? doc : { ...doc, _type: "consultation", isActive: true }
        })
      });
      const data = await res.json();

      if (data.success) {
        toast.success(editingConsultationId ? "Consultation service updated!" : "Consultation service created!");
        if (editingConsultationId) {
          setConsultations(consultations.map(c => c._id === editingConsultationId ? { ...c, ...doc, image: consultationForm.imageAssetId ? { asset: { url: consultationPreview, _ref: consultationForm.imageAssetId } } : null } : c));
          setEditingConsultationId(null);
        } else {
          setConsultations([...consultations, { ...data.result, image: consultationForm.imageAssetId ? { asset: { url: consultationPreview, _ref: consultationForm.imageAssetId } } : null }]);
        }
        setConsultationForm({ title: "", description: "", imageAssetId: "" });
        setConsultationPreview("");
      } else {
        toast.error(data.error || "Failed to save consultation.");
      }
    } catch (e) {
      toast.error("Save failed.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleAddAstrologer = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!astrologerForm.name || !astrologerForm.photoAssetId) {
      toast.error("Astrologer Name and Photo are required.");
      return;
    }
    setSubmitting(true);

    const specArray = astrologerForm.specializations.split(",").map(s => s.trim()).filter(Boolean);
    const langArray = astrologerForm.languages.split(",").map(l => l.trim()).filter(Boolean);

    const doc: any = {
      name: astrologerForm.name,
      slug: {
        _type: "slug",
        current: astrologerForm.name.toLowerCase().replace(/\s+/g, "-")
      },
      bio: astrologerForm.bio || undefined,
      specializations: specArray,
      languages: langArray,
      photo: {
        _type: "image",
        asset: {
          _type: "reference",
          _ref: astrologerForm.photoAssetId
        }
      },
      baseFee: Number(astrologerForm.baseFee) || 0,
      consultationCategory: astrologerForm.consultationCategoryId ? {
        _type: "reference",
        _ref: astrologerForm.consultationCategoryId
      } : null
    };

    try {
      const res = await fetch("/api/admin/write", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: editingAstrologerId ? "patch" : "create",
          id: editingAstrologerId || undefined,
          doc: editingAstrologerId ? doc : { ...doc, _type: "astrologer", isActive: true }
        })
      });
      const data = await res.json();

      if (data.success) {
        toast.success(editingAstrologerId ? "Astrologer profile updated!" : "Astrologer profile added!");
        
        const updatedCat = astrologerForm.consultationCategoryId 
          ? consultations.find(c => c._id === astrologerForm.consultationCategoryId) 
          : null;

        if (editingAstrologerId) {
          setAstrologers(astrologers.map(a => a._id === editingAstrologerId ? { 
            ...a, 
            ...doc, 
            photo: { asset: { url: astrologerPreview, _ref: astrologerForm.photoAssetId } },
            consultationCategory: updatedCat
          } : a));
          setEditingAstrologerId(null);
        } else {
          setAstrologers([...astrologers, { 
            ...data.result, 
            photo: { asset: { url: astrologerPreview, _ref: astrologerForm.photoAssetId } },
            consultationCategory: updatedCat
          }]);
        }
        setAstrologerForm({ name: "", bio: "", photoAssetId: "", specializations: "", languages: "", baseFee: 0, consultationCategoryId: "" });
        setAstrologerPreview("");
      } else {
        toast.error(data.error || "Failed to save astrologer.");
      }
    } catch (e) {
      toast.error("Save failed.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="w-full min-h-screen text-zinc-900 bg-zinc-50 flex flex-col select-none">
      {/* Top Bar Header */}
      <header className="w-full bg-[#120d26] text-white py-4 px-6 sm:px-10 flex items-center justify-between border-b border-white/10 shadow-sm shrink-0">
        <div className="flex items-center gap-3">
          <a href={`/${locale}`} className="p-1 rounded-full hover:bg-white/10 transition-colors text-white/80 hover:text-white mr-1">
            <ArrowLeft className="w-5 h-5" />
          </a>
          <span className="font-serif text-lg sm:text-xl font-black tracking-tight flex items-baseline">
            Astro<span className="text-[#E2C27A]">Kraft</span> Admin
          </span>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-xs font-semibold px-3 py-1 bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 rounded-full hidden sm:block">
            Secure Session
          </div>
          <button
            onClick={handleAdminLogout}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 text-red-400 hover:text-red-300 rounded-full text-xs font-black cursor-pointer transition-colors shadow-sm"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </header>

      {/* Workspace Wrapper */}
      <div className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col md:flex-row gap-8">
        
        {/* Sidebar Nav (Desktop) */}
        <aside className="w-full md:w-[220px] shrink-0 flex flex-row md:flex-col gap-1.5 overflow-x-auto md:overflow-x-visible pb-2 md:pb-0 scrollbar-none border-b md:border-b-0 md:border-r border-zinc-200 pr-0 md:pr-4">
          <button 
            onClick={() => setActiveTab("banners")} 
            className={cn(
              "flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-xs font-black transition-all shrink-0 cursor-pointer text-left w-full",
              activeTab === "banners" ? "bg-[#120d26] text-white shadow-sm" : "hover:bg-zinc-200 text-zinc-600"
            )}
          >
            <LayoutDashboard className="w-4.5 h-4.5" />
            <span>Ad Banners</span>
          </button>
          
          <button 
            onClick={() => setActiveTab("categories")} 
            className={cn(
              "flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-xs font-black transition-all shrink-0 cursor-pointer text-left w-full",
              activeTab === "categories" ? "bg-[#120d26] text-white shadow-sm" : "hover:bg-zinc-200 text-zinc-600"
            )}
          >
            <FolderHeart className="w-4.5 h-4.5" />
            <span>Categories</span>
          </button>
          
          <button 
            onClick={() => setActiveTab("products")} 
            className={cn(
              "flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-xs font-black transition-all shrink-0 cursor-pointer text-left w-full",
              activeTab === "products" ? "bg-[#120d26] text-white shadow-sm" : "hover:bg-zinc-200 text-zinc-600"
            )}
          >
            <ShoppingBag className="w-4.5 h-4.5" />
            <span>Products</span>
          </button>
          
          <button 
            onClick={() => setActiveTab("consultations")} 
            className={cn(
              "flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-xs font-black transition-all shrink-0 cursor-pointer text-left w-full",
              activeTab === "consultations" ? "bg-[#120d26] text-white shadow-sm" : "hover:bg-zinc-200 text-zinc-600"
            )}
          >
            <FileText className="w-4.5 h-4.5" />
            <span>Consultations</span>
          </button>

          <button 
            onClick={() => setActiveTab("astrologers")} 
            className={cn(
              "flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-xs font-black transition-all shrink-0 cursor-pointer text-left w-full",
              activeTab === "astrologers" ? "bg-[#120d26] text-white shadow-sm" : "hover:bg-zinc-200 text-zinc-600"
            )}
          >
            <Users className="w-4.5 h-4.5" />
            <span>Astrologers</span>
          </button>
        </aside>

        {/* Form and Table Workspace */}
        <main className="flex-1 min-w-0 space-y-8">
          
          {/* TAB 1: Ad Banners */}
          {activeTab === "banners" && (
            <div className="space-y-8 animate-in fade-in duration-300">
              {/* Form Card */}
              <div className="bg-white border border-zinc-200 rounded-3xl p-6 shadow-sm space-y-5">
                <h3 className="text-sm font-black uppercase tracking-wider text-zinc-500">
                  {editingBannerId ? "Edit Ad Banner" : "Upload Ad Banner"}
                </h3>
                
                <form onSubmit={handleAddBanner} className="grid grid-cols-1 md:grid-cols-2 gap-5 items-start">
                  <div className="space-y-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-black uppercase text-zinc-700 block">Banner Title</label>
                      <input 
                        type="text" 
                        required 
                        value={bannerForm.title}
                        onChange={e => setBannerForm({ ...bannerForm, title: e.target.value })}
                        className="w-full px-4 py-2 text-xs font-semibold rounded-xl border border-zinc-200 focus:outline-none focus:border-[#120d26]"
                        placeholder="Vedic Remedies Season Sale"
                      />
                    </div>
                    
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-black uppercase text-zinc-700 block">Redirect Link</label>
                      <input 
                        type="text" 
                        value={bannerForm.link}
                        onChange={e => setBannerForm({ ...bannerForm, link: e.target.value })}
                        className="w-full px-4 py-2 text-xs font-semibold rounded-xl border border-zinc-200 focus:outline-none focus:border-[#120d26]"
                        placeholder="/gemstones?category=crystals"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] font-black uppercase text-zinc-700 block">Sequence/Order</label>
                      <input 
                        type="number" 
                        value={bannerForm.sequence}
                        onChange={e => setBannerForm({ ...bannerForm, sequence: Number(e.target.value) })}
                        className="w-full px-4 py-2 text-xs font-semibold rounded-xl border border-zinc-200 focus:outline-none focus:border-[#120d26]"
                        placeholder="0"
                      />
                    </div>
                  </div>

                  {/* Image Uploader */}
                  <div className="flex flex-col gap-3">
                    <label className="text-[10px] font-black uppercase text-zinc-700 block">Banner Image</label>
                    <div className="w-full h-36 border-2 border-dashed border-zinc-200 rounded-2xl flex flex-col items-center justify-center p-4 relative overflow-hidden bg-zinc-50">
                      {bannerPreview ? (
                        <img src={bannerPreview} alt="Preview" className="absolute inset-0 w-full h-full object-cover" />
                      ) : (
                        <div className="flex flex-col items-center text-zinc-400 gap-1.5">
                          <Upload className="w-8 h-8" />
                          <span className="text-[10px] font-bold">Upload High-Res Banner</span>
                        </div>
                      )}
                      <input 
                        type="file" 
                        accept="image/*"
                        onChange={e => {
                          const file = e.target.files?.[0];
                          if (file) handleImageUpload(file, id => setBannerForm(prev => ({ ...prev, imageAssetId: id })), setBannerPreview);
                        }}
                        className="absolute inset-0 opacity-0 cursor-pointer" 
                      />
                    </div>
                    {uploading && <span className="text-[10px] font-semibold text-zinc-500">Uploading asset...</span>}
                    
                    <div className="flex gap-2">
                      {editingBannerId && (
                        <button
                          type="button"
                          onClick={() => {
                            setEditingBannerId(null);
                            setBannerForm({ title: "", link: "", sequence: 0, imageAssetId: "" });
                            setBannerPreview("");
                          }}
                          className="flex-1 bg-zinc-200 text-zinc-700 hover:bg-zinc-300 transition-colors font-bold py-2.5 text-xs rounded-xl cursor-pointer text-center uppercase tracking-wider"
                        >
                          Cancel
                        </button>
                      )}
                      <button 
                        type="submit" 
                        disabled={submitting || uploading}
                        className={cn(
                          "bg-[#120d26] text-white hover:bg-black/90 transition-colors font-bold py-2.5 text-xs rounded-xl shadow-sm cursor-pointer flex items-center justify-center gap-1.5 uppercase tracking-wider",
                          editingBannerId ? "flex-1" : "w-full"
                        )}
                      >
                        <Save className="w-4.5 h-4.5" />
                        <span>{submitting ? "Saving..." : editingBannerId ? "Update Banner" : "Create Banner"}</span>
                      </button>
                    </div>
                  </div>
                </form>
              </div>

              {/* Data Table */}
              <div className="bg-white border border-zinc-200 rounded-3xl p-6 shadow-sm space-y-4">
                <h3 className="text-sm font-black uppercase tracking-wider text-zinc-500">Live Ad Banners</h3>
                
                <div className="w-full overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="border-b border-zinc-150 text-zinc-500 font-bold uppercase text-[10px] tracking-wider">
                        <th className="pb-3 pr-4">Image</th>
                        <th className="pb-3 pr-4">Title</th>
                        <th className="pb-3 pr-4">Sequence</th>
                        <th className="pb-3 pr-4 text-center">Status</th>
                        <th className="pb-3 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-100">
                      {banners.map((item: any) => (
                        <tr key={item._id} className="hover:bg-zinc-50/50">
                          <td className="py-3.5 pr-4">
                            <div className="w-16 h-10 rounded-lg overflow-hidden border border-zinc-200 relative">
                              <img src={item.image ? urlFor(item.image).url() : "/placeholder-image.jpg"} alt={item.title} className="w-full h-full object-cover" />
                            </div>
                          </td>
                          <td className="py-3.5 pr-4 font-black">{item.title}</td>
                          <td className="py-3.5 pr-4 font-semibold">{item.sequence}</td>
                          <td className="py-3.5 pr-4 text-center">
                            <button
                              onClick={() => handleToggleActive(item._id, item.isActive, "banners")}
                              className={cn(
                                "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase cursor-pointer transition-colors shadow-sm",
                                item.isActive 
                                  ? "bg-emerald-50 text-emerald-700 border border-emerald-200" 
                                  : "bg-zinc-100 text-zinc-500 border border-zinc-200"
                              )}
                            >
                              {item.isActive ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                              <span>{item.isActive ? "Shown" : "Hidden"}</span>
                            </button>
                          </td>
                          <td className="py-3.5 text-right space-x-2">
                            <button 
                              onClick={() => handleStartEditBanner(item)}
                              className="p-1.5 rounded-lg text-blue-500 hover:bg-blue-50 transition-colors cursor-pointer border border-transparent hover:border-blue-200"
                              title="Edit Banner"
                            >
                              <Pencil className="w-4 h-4" />
                            </button>
                            <button 
                              onClick={() => handleDelete(item._id, "banners")}
                              className="p-1.5 rounded-lg text-red-500 hover:bg-red-50 transition-colors cursor-pointer border border-transparent hover:border-red-200"
                              title="Delete Banner"
                            >
                              <Trash className="w-4.5 h-4.5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: Categories */}
          {activeTab === "categories" && (
            <div className="space-y-8 animate-in fade-in duration-300">
              <div className="bg-white border border-zinc-200 rounded-3xl p-6 shadow-sm space-y-5">
                <h3 className="text-sm font-black uppercase tracking-wider text-zinc-500">
                  {editingCategoryId ? "Edit Category" : "Create New Category"}
                </h3>
                
                <form onSubmit={handleAddCategory} className="grid grid-cols-1 md:grid-cols-2 gap-5 items-start">
                  <div className="space-y-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-black uppercase text-zinc-700 block">Category Name</label>
                      <input 
                        type="text" 
                        required 
                        value={categoryForm.name}
                        onChange={e => setCategoryForm({ ...categoryForm, name: e.target.value })}
                        className="w-full px-4 py-2 text-xs font-semibold rounded-xl border border-zinc-200 focus:outline-none focus:border-[#120d26]"
                        placeholder="Gemstones"
                      />
                    </div>
                    
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-black uppercase text-zinc-700 block">Description</label>
                      <textarea 
                        value={categoryForm.description}
                        onChange={e => setCategoryForm({ ...categoryForm, description: e.target.value })}
                        className="w-full px-4 py-2 text-xs font-semibold rounded-xl border border-zinc-200 focus:outline-none focus:border-[#120d26] h-20 resize-none"
                        placeholder="Natural lab-certified gemstone collections..."
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-3">
                    <label className="text-[10px] font-black uppercase text-zinc-700 block">Category Icon / Image</label>
                    <div className="w-full h-36 border-2 border-dashed border-zinc-200 rounded-2xl flex flex-col items-center justify-center p-4 relative overflow-hidden bg-zinc-50">
                      {categoryPreview ? (
                        <img src={categoryPreview} alt="Preview" className="absolute inset-0 w-full h-full object-cover" />
                      ) : (
                        <div className="flex flex-col items-center text-zinc-400 gap-1.5">
                          <Upload className="w-8 h-8" />
                          <span className="text-[10px] font-bold">Upload Square Thumbnail</span>
                        </div>
                      )}
                      <input 
                        type="file" 
                        accept="image/*"
                        onChange={e => {
                          const file = e.target.files?.[0];
                          if (file) handleImageUpload(file, id => setCategoryForm(prev => ({ ...prev, imageAssetId: id })), setCategoryPreview);
                        }}
                        className="absolute inset-0 opacity-0 cursor-pointer" 
                      />
                    </div>
                    {uploading && <span className="text-[10px] font-semibold text-zinc-500">Uploading asset...</span>}
                    
                    <div className="flex gap-2">
                      {editingCategoryId && (
                        <button
                          type="button"
                          onClick={() => {
                            setEditingCategoryId(null);
                            setCategoryForm({ name: "", description: "", imageAssetId: "" });
                            setCategoryPreview("");
                          }}
                          className="flex-1 bg-zinc-200 text-zinc-700 hover:bg-zinc-300 transition-colors font-bold py-2.5 text-xs rounded-xl cursor-pointer text-center uppercase tracking-wider"
                        >
                          Cancel
                        </button>
                      )}
                      <button 
                        type="submit" 
                        disabled={submitting || uploading}
                        className={cn(
                          "bg-[#120d26] text-white hover:bg-black/90 transition-colors font-bold py-2.5 text-xs rounded-xl shadow-sm cursor-pointer flex items-center justify-center gap-1.5 uppercase tracking-wider",
                          editingCategoryId ? "flex-1" : "w-full"
                        )}
                      >
                        <Save className="w-4.5 h-4.5" />
                        <span>{submitting ? "Saving..." : editingCategoryId ? "Update Category" : "Create Category"}</span>
                      </button>
                    </div>
                  </div>
                </form>
              </div>

              <div className="bg-white border border-zinc-200 rounded-3xl p-6 shadow-sm space-y-4">
                <h3 className="text-sm font-black uppercase tracking-wider text-zinc-500">Product Categories</h3>
                
                <div className="w-full overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="border-b border-zinc-150 text-zinc-500 font-bold uppercase text-[10px] tracking-wider">
                        <th className="pb-3 pr-4">Image</th>
                        <th className="pb-3 pr-4">Name</th>
                        <th className="pb-3 pr-4 text-center">Status</th>
                        <th className="pb-3 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-100">
                      {categories.map((item: any) => (
                        <tr key={item._id} className="hover:bg-zinc-50/50">
                          <td className="py-3.5 pr-4">
                            <div className="w-10 h-10 rounded-full overflow-hidden border border-zinc-200 relative bg-zinc-100">
                              <img src={item.image ? urlFor(item.image).url() : "/placeholder-image.jpg"} alt={item.name} className="w-full h-full object-cover" />
                            </div>
                          </td>
                          <td className="py-3.5 pr-4 font-black">{item.name}</td>
                          <td className="py-3.5 pr-4 text-center">
                            <button
                              onClick={() => handleToggleActive(item._id, item.isActive, "categories")}
                              className={cn(
                                "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase cursor-pointer transition-colors shadow-sm",
                                item.isActive 
                                  ? "bg-emerald-50 text-emerald-700 border border-emerald-200" 
                                  : "bg-zinc-100 text-zinc-500 border border-zinc-200"
                              )}
                            >
                              {item.isActive ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                              <span>{item.isActive ? "Shown" : "Hidden"}</span>
                            </button>
                          </td>
                          <td className="py-3.5 text-right space-x-2">
                            <button 
                              onClick={() => handleStartEditCategory(item)}
                              className="p-1.5 rounded-lg text-blue-500 hover:bg-blue-50 transition-colors cursor-pointer border border-transparent hover:border-blue-200"
                              title="Edit Category"
                            >
                              <Pencil className="w-4 h-4" />
                            </button>
                            <button 
                              onClick={() => handleDelete(item._id, "categories")}
                              className="p-1.5 rounded-lg text-red-500 hover:bg-red-50 transition-colors cursor-pointer border border-transparent hover:border-red-200"
                              title="Delete Category"
                            >
                              <Trash className="w-4.5 h-4.5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: Products */}
          {activeTab === "products" && (
            <div className="space-y-8 animate-in fade-in duration-300">
              <div className="bg-white border border-zinc-200 rounded-3xl p-6 shadow-sm space-y-5">
                <h3 className="text-sm font-black uppercase tracking-wider text-zinc-500">
                  {editingProductId ? "Edit Product" : "Create New Product"}
                </h3>
                
                <form onSubmit={handleAddProduct} className="grid grid-cols-1 md:grid-cols-2 gap-5 items-start">
                  <div className="space-y-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-black uppercase text-zinc-700 block">Product Name</label>
                      <input 
                        type="text" 
                        required 
                        value={productForm.name}
                        onChange={e => setProductForm({ ...productForm, name: e.target.value })}
                        className="w-full px-4 py-2 text-xs font-semibold rounded-xl border border-zinc-200 focus:outline-none focus:border-[#120d26]"
                        placeholder="Natural Blue Sapphire (Neelam)"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-black uppercase text-zinc-700 block">Category</label>
                        <select 
                          required 
                          value={productForm.categoryId}
                          onChange={e => setProductForm({ ...productForm, categoryId: e.target.value })}
                          className="w-full px-3 py-2 text-xs font-semibold rounded-xl border border-zinc-200 focus:outline-none bg-white"
                        >
                          <option value="" disabled>Select Category</option>
                          {categories.map(cat => (
                            <option key={cat._id} value={cat._id}>{cat.name}</option>
                          ))}
                        </select>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[10px] font-black uppercase text-zinc-700 block">Weight (Carats)</label>
                        <input 
                          type="number" 
                          step="0.01"
                          value={productForm.carats}
                          onChange={e => setProductForm({ ...productForm, carats: e.target.value })}
                          className="w-full px-4 py-2 text-xs font-semibold rounded-xl border border-zinc-200 focus:outline-none focus:border-[#120d26]"
                          placeholder="5.25"
                        />
                      </div>
                    </div>

                    {isGemstone ? (
                      <div className="space-y-3.5 border-t border-zinc-100 pt-3.5">
                        <div className="text-[10px] font-black text-violet-700 uppercase tracking-widest flex items-center gap-1.5 select-none">
                          <span className="w-1.5 h-1.5 rounded-full bg-violet-600 animate-pulse" />
                          Quality Tier Pricing (Gemstones)
                        </div>
                        
                        <div className="border border-zinc-100 rounded-2xl p-3 bg-zinc-50/50 space-y-3">
                          <span className="text-[9px] font-extrabold uppercase text-zinc-400">Basic Tier</span>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1.5">
                              <label className="text-[9px] font-black uppercase text-zinc-500 block">Basic Price (₹) *</label>
                              <input 
                                type="number" 
                                min="0"
                                value={productForm.priceBasic}
                                onChange={e => setProductForm({ ...productForm, priceBasic: e.target.value })}
                                className="w-full px-3 py-1.5 text-xs font-semibold rounded-lg border border-zinc-200 focus:outline-none focus:border-[#120d26] bg-white"
                                placeholder="2999"
                              />
                            </div>
                            <div className="space-y-1.5">
                              <label className="text-[9px] font-black uppercase text-zinc-500 block">Basic Sale Price (₹)</label>
                              <input 
                                type="number" 
                                min="0"
                                value={productForm.salePriceBasic}
                                onChange={e => setProductForm({ ...productForm, salePriceBasic: e.target.value })}
                                className="w-full px-3 py-1.5 text-xs font-semibold rounded-lg border border-zinc-200 focus:outline-none focus:border-[#120d26] bg-white"
                                placeholder="1999"
                              />
                            </div>
                          </div>
                        </div>

                        <div className="border border-zinc-100 rounded-2xl p-3 bg-zinc-50/50 space-y-3">
                          <span className="text-[9px] font-extrabold uppercase text-zinc-400">Semi-Premium Tier</span>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1.5">
                              <label className="text-[9px] font-black uppercase text-zinc-500 block">Semi-Premium Price (₹)</label>
                              <input 
                                type="number" 
                                min="0"
                                value={productForm.priceSemiPremium}
                                onChange={e => setProductForm({ ...productForm, priceSemiPremium: e.target.value })}
                                className="w-full px-3 py-1.5 text-xs font-semibold rounded-lg border border-zinc-200 focus:outline-none focus:border-[#120d26] bg-white"
                                placeholder="5999"
                              />
                            </div>
                            <div className="space-y-1.5">
                              <label className="text-[9px] font-black uppercase text-zinc-500 block">Semi-Premium Sale Price (₹)</label>
                              <input 
                                type="number" 
                                min="0"
                                value={productForm.salePriceSemiPremium}
                                onChange={e => setProductForm({ ...productForm, salePriceSemiPremium: e.target.value })}
                                className="w-full px-3 py-1.5 text-xs font-semibold rounded-lg border border-zinc-200 focus:outline-none focus:border-[#120d26] bg-white"
                                placeholder="4999"
                              />
                            </div>
                          </div>
                        </div>

                        <div className="border border-zinc-100 rounded-2xl p-3 bg-zinc-50/50 space-y-3">
                          <span className="text-[9px] font-extrabold uppercase text-zinc-400">Premium Tier</span>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1.5">
                              <label className="text-[9px] font-black uppercase text-zinc-500 block">Premium Price (₹)</label>
                              <input 
                                type="number" 
                                min="0"
                                value={productForm.pricePremium}
                                onChange={e => setProductForm({ ...productForm, pricePremium: e.target.value })}
                                className="w-full px-3 py-1.5 text-xs font-semibold rounded-lg border border-zinc-200 focus:outline-none focus:border-[#120d26] bg-white"
                                placeholder="9999"
                              />
                            </div>
                            <div className="space-y-1.5">
                              <label className="text-[9px] font-black uppercase text-zinc-500 block">Premium Sale Price (₹)</label>
                              <input 
                                type="number" 
                                min="0"
                                value={productForm.salePricePremium}
                                onChange={e => setProductForm({ ...productForm, salePricePremium: e.target.value })}
                                className="w-full px-3 py-1.5 text-xs font-semibold rounded-lg border border-zinc-200 focus:outline-none focus:border-[#120d26] bg-white"
                                placeholder="8999"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-black uppercase text-zinc-700 block">Base Price (₹)</label>
                          <input 
                            type="number" 
                            min="0"
                            required 
                            value={productForm.price}
                            onChange={e => setProductForm({ ...productForm, price: Number(e.target.value) })}
                            className="w-full px-4 py-2 text-xs font-semibold rounded-xl border border-zinc-200 focus:outline-none focus:border-[#120d26]"
                            placeholder="4999"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-[10px] font-black uppercase text-zinc-700 block">Sale Price (₹)</label>
                          <input 
                            type="number" 
                            min="0"
                            value={productForm.salePrice}
                            onChange={e => setProductForm({ ...productForm, salePrice: e.target.value })}
                            className="w-full px-4 py-2 text-xs font-semibold rounded-xl border border-zinc-200 focus:outline-none focus:border-[#120d26]"
                            placeholder="3999"
                          />
                        </div>
                      </div>
                    )}

                    <div className="flex items-center gap-2 py-1 select-none">
                      <input 
                        type="checkbox" 
                        id="isBestSelling"
                        checked={productForm.isBestSelling}
                        onChange={e => setProductForm({ ...productForm, isBestSelling: e.target.checked })}
                        className="w-4 h-4 rounded border-zinc-300 text-violet-600 focus:ring-violet-500 cursor-pointer"
                      />
                      <label htmlFor="isBestSelling" className="text-[10px] font-black uppercase text-zinc-700 cursor-pointer">
                        Best Seller / Top Product
                      </label>
                    </div>
                    
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-black uppercase text-zinc-700 block">Description</label>
                      <textarea 
                        value={productForm.description}
                        onChange={e => setProductForm({ ...productForm, description: e.target.value })}
                        className="w-full px-4 py-2 text-xs font-semibold rounded-xl border border-zinc-200 focus:outline-none focus:border-[#120d26] h-16 resize-none"
                        placeholder="Authentic natural gemstone verified by GIA lab..."
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-3">
                    <label className="text-[10px] font-black uppercase text-zinc-700 block">Product Image</label>
                    <div className="w-full h-36 border-2 border-dashed border-zinc-200 rounded-2xl flex flex-col items-center justify-center p-4 relative overflow-hidden bg-zinc-50">
                      {productPreview ? (
                        <img src={productPreview} alt="Preview" className="absolute inset-0 w-full h-full object-cover" />
                      ) : (
                        <div className="flex flex-col items-center text-zinc-400 gap-1.5">
                          <Upload className="w-8 h-8" />
                          <span className="text-[10px] font-bold">Upload Product Photo</span>
                        </div>
                      )}
                      <input 
                        type="file" 
                        accept="image/*"
                        onChange={e => {
                          const file = e.target.files?.[0];
                          if (file) handleImageUpload(file, id => setProductForm(prev => ({ ...prev, imageAssetId: id })), setProductPreview);
                        }}
                        className="absolute inset-0 opacity-0 cursor-pointer" 
                      />
                    </div>
                    {uploading && <span className="text-[10px] font-semibold text-zinc-500">Uploading asset...</span>}
                    
                    <div className="flex gap-2">
                      {editingProductId && (
                        <button
                          type="button"
                          onClick={() => {
                            setEditingProductId(null);
                            setProductForm({ 
                              name: "", 
                              description: "", 
                              price: 0, 
                              salePrice: "", 
                              priceBasic: "", 
                              salePriceBasic: "", 
                              priceSemiPremium: "", 
                              salePriceSemiPremium: "", 
                              pricePremium: "", 
                              salePricePremium: "", 
                              isBestSelling: false,
                              carats: "", 
                              categoryId: "", 
                              imageAssetId: "" 
                            });
                            setProductPreview("");
                          }}
                          className="flex-1 bg-zinc-200 text-zinc-700 hover:bg-zinc-300 transition-colors font-bold py-2.5 text-xs rounded-xl cursor-pointer text-center uppercase tracking-wider"
                        >
                          Cancel
                        </button>
                      )}
                      <button 
                        type="submit" 
                        disabled={submitting || uploading}
                        className={cn(
                          "bg-[#120d26] text-white hover:bg-black/90 transition-colors font-bold py-2.5 text-xs rounded-xl shadow-sm cursor-pointer flex items-center justify-center gap-1.5 uppercase tracking-wider",
                          editingProductId ? "flex-1" : "w-full"
                        )}
                      >
                        <Save className="w-4.5 h-4.5" />
                        <span>{submitting ? "Saving..." : editingProductId ? "Update Product" : "Create Product"}</span>
                      </button>
                    </div>
                  </div>
                </form>
              </div>

              <div className="bg-white border border-zinc-200 rounded-3xl p-6 shadow-sm space-y-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-zinc-150 pb-4">
                  <h3 className="text-sm font-black uppercase tracking-wider text-zinc-500">Gemstones & Catalog Products</h3>
                  
                  {/* Debounced Search Bar */}
                  <div className="relative max-w-xs w-full">
                    <input
                      type="text"
                      value={productSearch}
                      onChange={e => setProductSearch(e.target.value)}
                      placeholder="Search products..."
                      className="w-full pl-8 pr-4 py-1.5 text-xs font-semibold rounded-xl border border-zinc-200 focus:outline-none focus:border-[#120d26] bg-zinc-50/50"
                    />
                    <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-zinc-400 text-xs select-none">🔍</span>
                  </div>
                </div>

                {/* Category Tabs */}
                {products.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pb-2 select-none border-b border-zinc-100">
                    {uniqueProductCategories.map((catName) => {
                      const count = catName === "All" 
                        ? filteredProducts.length 
                        : (filteredProductsByCategory[catName]?.length || 0);
                      return (
                        <button
                          key={catName}
                          onClick={() => setSelectedProductCategory(catName)}
                          className={cn(
                            "px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all cursor-pointer shadow-sm border",
                            selectedProductCategory === catName
                              ? "bg-[#120d26] text-white border-[#120d26]"
                              : "bg-zinc-50 text-zinc-600 border-zinc-200 hover:bg-zinc-100 hover:text-zinc-800"
                          )}
                        >
                          {catName} ({count})
                        </button>
                      );
                    })}
                  </div>
                )}
                
                {filteredProducts.length === 0 ? (
                  <div className="text-center py-8 text-zinc-400 text-xs font-semibold select-none">
                    {products.length === 0 ? "No products created yet." : "No products match your search query."}
                  </div>
                ) : (
                  Object.entries(filteredProductsByCategory)
                    .filter(([name]) => selectedProductCategory === "All" || name === selectedProductCategory)
                    .map(([categoryName, items]) => (
                      <div key={categoryName} className="space-y-3 pt-4 border-t border-zinc-100 first:border-t-0 first:pt-0">
                        {selectedProductCategory === "All" && (
                          <div className="flex items-center justify-between bg-zinc-50 border border-zinc-200/60 py-2 px-4 rounded-xl">
                            <span className="text-[10px] font-black uppercase tracking-wider text-violet-700">
                              📁 {categoryName} ({items.length})
                            </span>
                          </div>
                        )}

                        <div className="w-full overflow-x-auto">
                          <table className="w-full text-left border-collapse text-xs">
                            <thead>
                              <tr className="border-b border-zinc-150 text-zinc-500 font-bold uppercase text-[9px] tracking-wider">
                                <th className="pb-3 pr-4 w-[60px]">Photo</th>
                                <th className="pb-3 pr-4">Name</th>
                                <th className="pb-3 pr-4 w-[120px]">Price</th>
                                <th className="pb-3 pr-4 w-[120px] text-center">Status</th>
                                <th className="pb-3 text-right w-[100px]">Actions</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-zinc-100">
                              {items.map((item: any) => (
                                <tr key={item._id} className="hover:bg-zinc-50/50">
                                  <td className="py-3 pr-4">
                                    <div className="w-9 h-9 rounded-lg overflow-hidden border border-zinc-200 relative bg-zinc-100">
                                      <img src={item.image ? urlFor(item.image).url() : "/placeholder-image.jpg"} alt={item.name} className="w-full h-full object-cover" />
                                    </div>
                                  </td>
                                  <td className="py-3 pr-4 font-black">
                                    <div className="flex flex-col gap-0.5">
                                      <span>{item.name}</span>
                                      {item.isBestSelling && (
                                        <span className="inline-block bg-amber-150 text-amber-800 text-[8px] font-black uppercase px-1.5 py-0.5 rounded w-fit scale-90 origin-left">
                                          🔥 Best Seller
                                        </span>
                                      )}
                                    </div>
                                  </td>
                                  <td className="py-3 pr-4 font-semibold">₹{item.salePrice || item.price}</td>
                                  <td className="py-3 pr-4 text-center">
                                    <button
                                      onClick={() => handleToggleActive(item._id, item.isActive, "products")}
                                      className={cn(
                                        "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase cursor-pointer transition-colors shadow-sm",
                                        item.isActive 
                                          ? "bg-emerald-50 text-emerald-700 border border-emerald-200" 
                                          : "bg-zinc-100 text-zinc-500 border border-zinc-200"
                                      )}
                                    >
                                      {item.isActive ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                                      <span>{item.isActive ? "Shown" : "Hidden"}</span>
                                    </button>
                                  </td>
                                  <td className="py-3 text-right space-x-2">
                                    <button 
                                      onClick={() => handleStartEditProduct(item)}
                                      className="p-1.5 rounded-lg text-blue-500 hover:bg-blue-50 transition-colors cursor-pointer border border-transparent hover:border-blue-200"
                                      title="Edit Product"
                                    >
                                      <Pencil className="w-4 h-4" />
                                    </button>
                                    <button 
                                      onClick={() => handleDelete(item._id, "products")}
                                      className="p-1.5 rounded-lg text-red-500 hover:bg-red-50 transition-colors cursor-pointer border border-transparent hover:border-red-200"
                                      title="Delete Product"
                                    >
                                      <Trash className="w-4.5 h-4.5" />
                                    </button>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    ))
                )}
              </div>
            </div>
          )}

          {/* TAB 4: Consultations */}
          {activeTab === "consultations" && (
            <div className="space-y-8 animate-in fade-in duration-300">
              <div className="bg-white border border-zinc-200 rounded-3xl p-6 shadow-sm space-y-5">
                <h3 className="text-sm font-black uppercase tracking-wider text-zinc-500">
                  {editingConsultationId ? "Edit Consultation Category" : "Create Consultation Category"}
                </h3>
                
                <form onSubmit={handleAddConsultation} className="grid grid-cols-1 md:grid-cols-2 gap-5 items-start">
                  <div className="space-y-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-black uppercase text-zinc-700 block">Service Title</label>
                      <input 
                        type="text" 
                        required 
                        value={consultationForm.title}
                        onChange={e => setConsultationForm({ ...consultationForm, title: e.target.value })}
                        className="w-full px-4 py-2 text-xs font-semibold rounded-xl border border-zinc-200 focus:outline-none focus:border-[#120d26]"
                        placeholder="Love & Marriage Guidance"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] font-black uppercase text-zinc-700 block">Description</label>
                      <textarea 
                        value={consultationForm.description}
                        onChange={e => setConsultationForm({ ...consultationForm, description: e.target.value })}
                        className="w-full px-4 py-2 text-xs font-semibold rounded-xl border border-zinc-200 focus:outline-none focus:border-[#120d26] h-16 resize-none"
                        placeholder="Get matched horoscope answers from astrologers..."
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-3">
                    <label className="text-[10px] font-black uppercase text-zinc-700 block">Service Icon / Graphic (Optional)</label>
                    <div className="w-full h-36 border-2 border-dashed border-zinc-200 rounded-2xl flex flex-col items-center justify-center p-4 relative overflow-hidden bg-zinc-50">
                      {consultationPreview ? (
                        <img src={consultationPreview} alt="Preview" className="absolute inset-0 w-full h-full object-cover" />
                      ) : (
                        <div className="flex flex-col items-center text-zinc-400 gap-1.5">
                          <Upload className="w-8 h-8" />
                          <span className="text-[10px] font-bold">Upload Vector SVG / Photo</span>
                        </div>
                      )}
                      <input 
                        type="file" 
                        accept="image/*"
                        onChange={e => {
                          const file = e.target.files?.[0];
                          if (file) handleImageUpload(file, id => setConsultationForm(prev => ({ ...prev, imageAssetId: id })), setConsultationPreview);
                        }}
                        className="absolute inset-0 opacity-0 cursor-pointer" 
                      />
                    </div>
                    {uploading && <span className="text-[10px] font-semibold text-zinc-500">Uploading asset...</span>}
                    
                    <div className="flex gap-2">
                      {editingConsultationId && (
                        <button
                          type="button"
                          onClick={() => {
                            setEditingConsultationId(null);
                            setConsultationForm({ title: "", description: "", imageAssetId: "" });
                            setConsultationPreview("");
                          }}
                          className="flex-1 bg-zinc-200 text-zinc-700 hover:bg-zinc-300 transition-colors font-bold py-2.5 text-xs rounded-xl cursor-pointer text-center uppercase tracking-wider"
                        >
                          Cancel
                        </button>
                      )}
                      <button 
                        type="submit" 
                        disabled={submitting || uploading}
                        className={cn(
                          "bg-[#120d26] text-white hover:bg-black/90 transition-colors font-bold py-2.5 text-xs rounded-xl shadow-sm cursor-pointer flex items-center justify-center gap-1.5 uppercase tracking-wider",
                          editingConsultationId ? "flex-1" : "w-full"
                        )}
                      >
                        <Save className="w-4.5 h-4.5" />
                        <span>{submitting ? "Saving..." : editingConsultationId ? "Update Consultation" : "Create Consultation"}</span>
                      </button>
                    </div>
                  </div>
                </form>
              </div>

              <div className="bg-white border border-zinc-200 rounded-3xl p-6 shadow-sm space-y-4">
                <h3 className="text-sm font-black uppercase tracking-wider text-zinc-500">Vedic Consultation Offerings</h3>
                
                <div className="w-full overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="border-b border-zinc-150 text-zinc-500 font-bold uppercase text-[10px] tracking-wider">
                        <th className="pb-3 pr-4">Icon</th>
                        <th className="pb-3 pr-4">Title</th>
                        <th className="pb-3 pr-4 text-center">Status</th>
                        <th className="pb-3 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-100">
                      {consultations.map((item: any) => (
                        <tr key={item._id} className="hover:bg-zinc-50/50">
                          <td className="py-3.5 pr-4">
                            <div className="w-10 h-10 rounded-xl overflow-hidden border border-zinc-200 relative bg-zinc-100">
                              <img src={item.image ? urlFor(item.image).url() : "/placeholder-image.jpg"} alt={item.title} className="w-full h-full object-cover" />
                            </div>
                          </td>
                          <td className="py-3.5 pr-4 font-black">{item.title}</td>
                          <td className="py-3.5 pr-4 text-center">
                            <button
                              onClick={() => handleToggleActive(item._id, item.isActive, "consultations")}
                              className={cn(
                                "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase cursor-pointer transition-colors shadow-sm",
                                item.isActive 
                                  ? "bg-emerald-50 text-emerald-700 border border-emerald-200" 
                                  : "bg-zinc-100 text-zinc-500 border border-zinc-200"
                              )}
                            >
                              {item.isActive ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                              <span>{item.isActive ? "Shown" : "Hidden"}</span>
                            </button>
                          </td>
                          <td className="py-3.5 text-right space-x-2">
                            <button 
                              onClick={() => handleStartEditConsultation(item)}
                              className="p-1.5 rounded-lg text-blue-500 hover:bg-blue-50 transition-colors cursor-pointer border border-transparent hover:border-blue-200"
                              title="Edit Consultation"
                            >
                              <Pencil className="w-4 h-4" />
                            </button>
                            <button 
                              onClick={() => handleDelete(item._id, "consultations")}
                              className="p-1.5 rounded-lg text-red-500 hover:bg-red-50 transition-colors cursor-pointer border border-transparent hover:border-red-200"
                              title="Delete Consultation"
                            >
                              <Trash className="w-4.5 h-4.5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: Astrologers */}
          {activeTab === "astrologers" && (
            <div className="space-y-8 animate-in fade-in duration-300">
              <div className="bg-white border border-zinc-200 rounded-3xl p-6 shadow-sm space-y-5">
                <h3 className="text-sm font-black uppercase tracking-wider text-zinc-500">
                  {editingAstrologerId ? "Edit Astrologer Profile" : "Add Astrologer Profile"}
                </h3>
                
                <form onSubmit={handleAddAstrologer} className="grid grid-cols-1 md:grid-cols-2 gap-5 items-start">
                  <div className="space-y-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-black uppercase text-zinc-700 block">Full Name</label>
                      <input 
                        type="text" 
                        required 
                        value={astrologerForm.name}
                        onChange={e => setAstrologerForm({ ...astrologerForm, name: e.target.value })}
                        className="w-full px-4 py-2 text-xs font-semibold rounded-xl border border-zinc-200 focus:outline-none focus:border-[#120d26]"
                        placeholder="Acharya Deepak"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] font-black uppercase text-zinc-700 block">Specializations (comma separated)</label>
                      <input 
                        type="text" 
                        value={astrologerForm.specializations}
                        onChange={e => setAstrologerForm({ ...astrologerForm, specializations: e.target.value })}
                        className="w-full px-4 py-2 text-xs font-semibold rounded-xl border border-zinc-200 focus:outline-none focus:border-[#120d26]"
                        placeholder="Vedic Astrology, Kundli Reading, Numerology"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] font-black uppercase text-zinc-700 block">Languages (comma separated)</label>
                      <input 
                        type="text" 
                        value={astrologerForm.languages}
                        onChange={e => setAstrologerForm({ ...astrologerForm, languages: e.target.value })}
                        className="w-full px-4 py-2 text-xs font-semibold rounded-xl border border-zinc-200 focus:outline-none focus:border-[#120d26]"
                        placeholder="English, Hindi, Bengali"
                      />
                    </div>
                    
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-black uppercase text-zinc-700 block">Brief Bio</label>
                      <textarea 
                        value={astrologerForm.bio}
                        onChange={e => setAstrologerForm({ ...astrologerForm, bio: e.target.value })}
                        className="w-full px-4 py-2 text-xs font-semibold rounded-xl border border-zinc-200 focus:outline-none focus:border-[#120d26] h-16 resize-none"
                        placeholder="Expert astrologer with 12+ years experience..."
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] font-black uppercase text-zinc-700 block">Consultation Fee (₹)</label>
                      <input 
                        type="number" 
                        min="0"
                        required 
                        value={astrologerForm.baseFee}
                        onChange={e => setAstrologerForm({ ...astrologerForm, baseFee: Number(e.target.value) })}
                        className="w-full px-4 py-2 text-xs font-semibold rounded-xl border border-zinc-200 focus:outline-none focus:border-[#120d26]"
                        placeholder="500"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] font-black uppercase text-zinc-700 block">Consultation Category Expertise (Optional)</label>
                      <select 
                        value={astrologerForm.consultationCategoryId}
                        onChange={e => setAstrologerForm({ ...astrologerForm, consultationCategoryId: e.target.value })}
                        className="w-full px-4 py-2 text-xs font-semibold rounded-xl border border-zinc-200 focus:outline-none focus:border-[#120d26] bg-white font-sans text-xs"
                      >
                        <option value="">None / Unassigned</option>
                        {consultations.map((item: any) => (
                          <option key={item._id} value={item._id}>
                            {item.title}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="flex flex-col gap-3">
                    <label className="text-[10px] font-black uppercase text-zinc-700 block">Profile Photo</label>
                    <div className="w-full h-36 border-2 border-dashed border-zinc-200 rounded-2xl flex flex-col items-center justify-center p-4 relative overflow-hidden bg-zinc-50">
                      {astrologerPreview ? (
                        <img src={astrologerPreview} alt="Preview" className="absolute inset-0 w-full h-full object-cover" />
                      ) : (
                        <div className="flex flex-col items-center text-zinc-400 gap-1.5">
                          <Upload className="w-8 h-8" />
                          <span className="text-[10px] font-bold">Upload Portrait Photo</span>
                        </div>
                      )}
                      <input 
                        type="file" 
                        accept="image/*"
                        onChange={e => {
                          const file = e.target.files?.[0];
                          if (file) handleImageUpload(file, id => setAstrologerForm(prev => ({ ...prev, photoAssetId: id })), setAstrologerPreview);
                        }}
                        className="absolute inset-0 opacity-0 cursor-pointer" 
                      />
                    </div>
                    {uploading && <span className="text-[10px] font-semibold text-zinc-500">Uploading asset...</span>}
                    
                    <div className="flex gap-2">
                      {editingAstrologerId && (
                        <button
                          type="button"
                          onClick={() => {
                            setEditingAstrologerId(null);
                            setAstrologerForm({ name: "", bio: "", photoAssetId: "", specializations: "", languages: "", baseFee: 0, consultationCategoryId: "" });
                            setAstrologerPreview("");
                          }}
                          className="flex-1 bg-zinc-200 text-zinc-700 hover:bg-zinc-300 transition-colors font-bold py-2.5 text-xs rounded-xl cursor-pointer text-center uppercase tracking-wider"
                        >
                          Cancel
                        </button>
                      )}
                      <button 
                        type="submit" 
                        disabled={submitting || uploading}
                        className={cn(
                          "bg-[#120d26] text-white hover:bg-black/90 transition-colors font-bold py-2.5 text-xs rounded-xl shadow-sm cursor-pointer flex items-center justify-center gap-1.5 uppercase tracking-wider",
                          editingAstrologerId ? "flex-1" : "w-full"
                        )}
                      >
                        <Save className="w-4.5 h-4.5" />
                        <span>{submitting ? "Saving..." : editingAstrologerId ? "Update Astrologer" : "Add Astrologer"}</span>
                      </button>
                    </div>
                  </div>
                </form>
              </div>

              <div className="bg-white border border-zinc-200 rounded-3xl p-6 shadow-sm space-y-4">
                <h3 className="text-sm font-black uppercase tracking-wider text-zinc-500">Astrologers Directory</h3>
                
                <div className="w-full overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="border-b border-zinc-150 text-zinc-500 font-bold uppercase text-[10px] tracking-wider">
                        <th className="pb-3 pr-4">Photo</th>
                        <th className="pb-3 pr-4">Name</th>
                        <th className="pb-3 pr-4">Languages</th>
                        <th className="pb-3 pr-4">Fee</th>
                        <th className="pb-3 pr-4">Category</th>
                        <th className="pb-3 pr-4 text-center">Status</th>
                        <th className="pb-3 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-100">
                      {astrologers.map((item: any) => (
                        <tr key={item._id} className="hover:bg-zinc-50/50">
                          <td className="py-3.5 pr-4">
                            <div className="w-10 h-10 rounded-full overflow-hidden border border-zinc-200 relative bg-zinc-100">
                              <img src={item.photo ? urlFor(item.photo).url() : "/placeholder-image.jpg"} alt={item.name} className="w-full h-full object-cover" />
                            </div>
                          </td>
                          <td className="py-3.5 pr-4 font-black">{item.name}</td>
                          <td className="py-3.5 pr-4 font-semibold">{item.languages?.join(", ")}</td>
                          <td className="py-3.5 pr-4 font-semibold">₹{item.baseFee || 0}</td>
                          <td className="py-3.5 pr-4 font-semibold text-zinc-500">{item.consultationCategory?.title || "—"}</td>
                          <td className="py-3.5 pr-4 text-center">
                            <button
                              onClick={() => handleToggleActive(item._id, item.isActive, "astrologers")}
                              className={cn(
                                "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase cursor-pointer transition-colors shadow-sm",
                                item.isActive 
                                  ? "bg-emerald-50 text-emerald-700 border border-emerald-200" 
                                  : "bg-zinc-100 text-zinc-500 border border-zinc-200"
                              )}
                            >
                              {item.isActive ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                              <span>{item.isActive ? "Shown" : "Hidden"}</span>
                            </button>
                          </td>
                          <td className="py-3.5 text-right space-x-2">
                            <button 
                              onClick={() => handleStartEditAstrologer(item)}
                              className="p-1.5 rounded-lg text-blue-500 hover:bg-blue-50 transition-colors cursor-pointer border border-transparent hover:border-blue-200"
                              title="Edit Astrologer"
                            >
                              <Pencil className="w-4 h-4" />
                            </button>
                            <button 
                              onClick={() => handleDelete(item._id, "astrologers")}
                              className="p-1.5 rounded-lg text-red-500 hover:bg-red-50 transition-colors cursor-pointer border border-transparent hover:border-red-200"
                              title="Delete Astrologer"
                            >
                              <Trash className="w-4.5 h-4.5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

        </main>
      </div>
    </div>
  );
}
