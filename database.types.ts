export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  portfolio: {
    Tables: {
      cases: {
        Row: {
          client: string
          detail: string
          id: string
          lang: string
          metric: string
          position: number
          slug: string
          title: string
          visible: boolean
        }
        Insert: {
          client: string
          detail: string
          id?: string
          lang: string
          metric: string
          position: number
          slug: string
          title: string
          visible?: boolean
        }
        Update: {
          client?: string
          detail?: string
          id?: string
          lang?: string
          metric?: string
          position?: number
          slug?: string
          title?: string
          visible?: boolean
        }
        Relationships: []
      }
      clients: {
        Row: {
          id: string
          lang: string
          name: string
          position: number
          sector: string
          slug: string
          visible: boolean
        }
        Insert: {
          id?: string
          lang: string
          name: string
          position: number
          sector: string
          slug: string
          visible?: boolean
        }
        Update: {
          id?: string
          lang?: string
          name?: string
          position?: number
          sector?: string
          slug?: string
          visible?: boolean
        }
        Relationships: []
      }
      companies: {
        Row: {
          client: string
          end: string | null
          id: string
          items: string[]
          lang: string
          start: string
          title: string
        }
        Insert: {
          client: string
          end?: string | null
          id: string
          items: string[]
          lang: string
          start: string
          title: string
        }
        Update: {
          client?: string
          end?: string | null
          id?: string
          items?: string[]
          lang?: string
          start?: string
          title?: string
        }
        Relationships: []
      }
      projects: {
        Row: {
          description: string
          id: string
          lang: string
          link: string
          picture: string
          title: string
        }
        Insert: {
          description: string
          id?: string
          lang: string
          link: string
          picture: string
          title: string
        }
        Update: {
          description?: string
          id?: string
          lang?: string
          link?: string
          picture?: string
          title?: string
        }
        Relationships: []
      }
      posts: {
        Row: {
          body_md: string
          cover: string | null
          description: string
          id: string
          image: string | null
          lang: string
          linkedin: string | null
          published: boolean
          published_at: string
          slug: string
          tag: string
          title: string
          video: string | null
        }
        Insert: {
          body_md: string
          cover?: string | null
          description: string
          id?: string
          image?: string | null
          lang: string
          linkedin?: string | null
          published?: boolean
          published_at: string
          slug: string
          tag: string
          title: string
          video?: string | null
        }
        Update: {
          body_md?: string
          cover?: string | null
          description?: string
          id?: string
          image?: string | null
          lang?: string
          linkedin?: string | null
          published?: boolean
          published_at?: string
          slug?: string
          tag?: string
          title?: string
          video?: string | null
        }
        Relationships: []
      }
      site_copy: {
        Row: {
          key: string
          lang: string
          value: string
        }
        Insert: {
          key: string
          lang: string
          value: string
        }
        Update: {
          key?: string
          lang?: string
          value?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never
