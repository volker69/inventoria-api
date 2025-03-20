export interface IProductResponseEc {
    product: IProductEc ; 
  }
  
  export interface IProductEc {
    id: number;
    name: string;
    page_title: string;
    description: string;
    meta_description: string;
    price: number;
    cost_per_item: number | null;
    compare_at_price: number | null;
    weight: number;
    stock: number;
    stock_unlimited: boolean;
    stock_threshold: number;
    stock_notification: boolean;
    sku: string | null;
    brand: string | null;
    barcode: string | null;
    featured: boolean;
    reviews_enabled: boolean;
    status: string;
    shipping_required: boolean;
    type: string;
    days_to_expire: number | null;
    created_at: string;
    updated_at: string;
    package_format: string;
    length: number;
    width: number;
    height: number;
    diameter: number;
    google_product_category: string | null;
    categories: ICategoryEc[];
    images: IImageEc[];
    variants: IVariantEc[];
    fields: Field[];
    permalink: string;
    discount: string;
    currency: string;
  }
  
  interface ICategoryEc {
    id: number;
    name: string;
    description: string | null;
  }
  
  interface IImageEc {
    id: number;
    url: string;
    position: number;
  }
  
  interface IVariantEc {
    id: number;
    position: number;
    price: number;
    cost_per_item: number | null;
    compare_at_price: number | null;
    sku: string | null;
    barcode: string | null;
    stock: number;
    stock_unlimited: boolean;
    stock_threshold: number;
    stock_notification: boolean;
    weight: number;
    options: Option[];
    image: IImageEc;
    discount: string;
  }
  
  interface Option {
    product_option_id: number;
    product_option_value_id: number;
    option_type: string;
    name: string;
    value: string;
    custom: string | null;
    product_option_position: number;
    product_value_position: number;
  }
  
  interface Field {
    // Aquí se pueden definir propiedades específicas si existen campos personalizados
  }

  export interface errorResponse {
  
    message: string;
  } 