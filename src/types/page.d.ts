export interface Page {
  total_count: number;
  items: PageItem[];
}

export interface PageItem {
  id: number;
  name: String;
  full_name: String;
}
export interface Bundle {
  per: number;
}
