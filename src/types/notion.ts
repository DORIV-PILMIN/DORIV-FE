export interface NotionSearchPagesRequest {
  query: string;
  pageSize?: number;
  startCursor?: string;
}

export interface NotionSearchPageItem {
  notionPageId: string;
  title: string;
  url: string;
  lastEditedTime: string;
}

export interface NotionSearchPagesResponse {
  pages: NotionSearchPageItem[];
}

export interface CreateNotionPageRequest {
  notionUrl: string;
  notionPageId: string;
}

export interface ConnectedNotionPage {
  pageId: string;
  notionPageId: string;
  title: string;
  url: string;
  isConnected: boolean;
  connectedAt: string;
}

export interface CreateNotionPageResponse {
  page: ConnectedNotionPage;
}
