export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      attendance: {
        Row: {
          check_in_time: string
          check_out_time: string | null
          created_at: string | null
          id: string
          member_id: string
          updated_at: string | null
        }
        Insert: {
          check_in_time: string
          check_out_time?: string | null
          created_at?: string | null
          id?: string
          member_id: string
          updated_at?: string | null
        }
        Update: {
          check_in_time?: string
          check_out_time?: string | null
          created_at?: string | null
          id?: string
          member_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "attendance_member_id_fkey"
            columns: ["member_id"]
            isOneToOne: false
            referencedRelation: "members"
            referencedColumns: ["id"]
          },
        ]
      }
      gym_locations: {
        Row: {
          address: string
          city: string
          closing_time: string
          created_at: string | null
          email: string | null
          id: string
          manager_id: string
          name: string
          opening_time: string
          phone: string
          pincode: string
          state: string
          updated_at: string | null
        }
        Insert: {
          address: string
          city: string
          closing_time: string
          created_at?: string | null
          email?: string | null
          id?: string
          manager_id: string
          name: string
          opening_time: string
          phone: string
          pincode: string
          state: string
          updated_at?: string | null
        }
        Update: {
          address?: string
          city?: string
          closing_time?: string
          created_at?: string | null
          email?: string | null
          id?: string
          manager_id?: string
          name?: string
          opening_time?: string
          phone?: string
          pincode?: string
          state?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "gym_locations_manager_id_fkey"
            columns: ["manager_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      members: {
        Row: {
          active: boolean | null
          address: string | null
          created_at: string | null
          created_by: string
          date_of_birth: string | null
          email: string | null
          emergency_contact: string | null
          gender: string | null
          gym_location_id: string
          id: string
          join_date: string | null
          name: string
          phone: string
          updated_at: string | null
        }
        Insert: {
          active?: boolean | null
          address?: string | null
          created_at?: string | null
          created_by: string
          date_of_birth?: string | null
          email?: string | null
          emergency_contact?: string | null
          gender?: string | null
          gym_location_id: string
          id?: string
          join_date?: string | null
          name: string
          phone: string
          updated_at?: string | null
        }
        Update: {
          active?: boolean | null
          address?: string | null
          created_at?: string | null
          created_by?: string
          date_of_birth?: string | null
          email?: string | null
          emergency_contact?: string | null
          gender?: string | null
          gym_location_id?: string
          id?: string
          join_date?: string | null
          name?: string
          phone?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "members_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "members_gym_location_id_fkey"
            columns: ["gym_location_id"]
            isOneToOne: false
            referencedRelation: "gym_locations"
            referencedColumns: ["id"]
          },
        ]
      }
      membership_enrollments: {
        Row: {
          created_at: string | null
          end_date: string
          id: string
          member_id: string
          membership_id: string
          start_date: string
          status: Database["public"]["Enums"]["enrollment_status"] | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          end_date: string
          id?: string
          member_id: string
          membership_id: string
          start_date: string
          status?: Database["public"]["Enums"]["enrollment_status"] | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          end_date?: string
          id?: string
          member_id?: string
          membership_id?: string
          start_date?: string
          status?: Database["public"]["Enums"]["enrollment_status"] | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "membership_enrollments_member_id_fkey"
            columns: ["member_id"]
            isOneToOne: false
            referencedRelation: "members"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "membership_enrollments_membership_id_fkey"
            columns: ["membership_id"]
            isOneToOne: false
            referencedRelation: "memberships"
            referencedColumns: ["id"]
          },
        ]
      }
      memberships: {
        Row: {
          allowed_classes: string[] | null
          created_at: string | null
          description: string | null
          duration: number
          gym_location_id: string
          id: string
          name: string
          price: number
          updated_at: string | null
        }
        Insert: {
          allowed_classes?: string[] | null
          created_at?: string | null
          description?: string | null
          duration: number
          gym_location_id: string
          id?: string
          name: string
          price: number
          updated_at?: string | null
        }
        Update: {
          allowed_classes?: string[] | null
          created_at?: string | null
          description?: string | null
          duration?: number
          gym_location_id?: string
          id?: string
          name?: string
          price?: number
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "memberships_gym_location_id_fkey"
            columns: ["gym_location_id"]
            isOneToOne: false
            referencedRelation: "gym_locations"
            referencedColumns: ["id"]
          },
        ]
      }
      payments: {
        Row: {
          amount: number
          created_at: string | null
          gym_location_id: string
          id: string
          member_id: string
          membership_enrollment_id: string | null
          notes: string | null
          payment_date: string | null
          payment_method: Database["public"]["Enums"]["payment_method"]
          reference: string | null
          status: Database["public"]["Enums"]["payment_status"] | null
          updated_at: string | null
        }
        Insert: {
          amount: number
          created_at?: string | null
          gym_location_id: string
          id?: string
          member_id: string
          membership_enrollment_id?: string | null
          notes?: string | null
          payment_date?: string | null
          payment_method: Database["public"]["Enums"]["payment_method"]
          reference?: string | null
          status?: Database["public"]["Enums"]["payment_status"] | null
          updated_at?: string | null
        }
        Update: {
          amount?: number
          created_at?: string | null
          gym_location_id?: string
          id?: string
          member_id?: string
          membership_enrollment_id?: string | null
          notes?: string | null
          payment_date?: string | null
          payment_method?: Database["public"]["Enums"]["payment_method"]
          reference?: string | null
          status?: Database["public"]["Enums"]["payment_status"] | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "payments_gym_location_id_fkey"
            columns: ["gym_location_id"]
            isOneToOne: false
            referencedRelation: "gym_locations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "payments_member_id_fkey"
            columns: ["member_id"]
            isOneToOne: false
            referencedRelation: "members"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "payments_membership_enrollment_id_fkey"
            columns: ["membership_enrollment_id"]
            isOneToOne: false
            referencedRelation: "membership_enrollments"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          email: string | null
          id: string
          name: string
          phone: string | null
          role: Database["public"]["Enums"]["app_role"] | null
        }
        Insert: {
          email?: string | null
          id: string
          name: string
          phone?: string | null
          role?: Database["public"]["Enums"]["app_role"] | null
        }
        Update: {
          email?: string | null
          id?: string
          name?: string
          phone?: string | null
          role?: Database["public"]["Enums"]["app_role"] | null
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
      app_role: "ADMIN" | "MANAGER" | "STAFF"
      enrollment_status: "ACTIVE" | "EXPIRED" | "CANCELLED" | "PENDING"
      inquiry_status: "OPEN" | "IN_PROGRESS" | "RESOLVED" | "CLOSED"
      notification_type:
        | "PAYMENT_REMINDER"
        | "MEMBERSHIP_EXPIRY"
        | "ANNOUNCEMENT"
        | "PROMOTION"
        | "SYSTEM"
      payment_method:
        | "CASH"
        | "UPI"
        | "BANK_TRANSFER"
        | "CARD"
        | "CHEQUE"
        | "OTHER"
      payment_status: "PENDING" | "COMPLETED" | "FAILED" | "REFUNDED"
      support_ticket_priority: "LOW" | "MEDIUM" | "HIGH"
      support_ticket_status: "OPEN" | "IN_PROGRESS" | "RESOLVED" | "CLOSED"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["ADMIN", "MANAGER", "STAFF"],
      enrollment_status: ["ACTIVE", "EXPIRED", "CANCELLED", "PENDING"],
      inquiry_status: ["OPEN", "IN_PROGRESS", "RESOLVED", "CLOSED"],
      notification_type: [
        "PAYMENT_REMINDER",
        "MEMBERSHIP_EXPIRY",
        "ANNOUNCEMENT",
        "PROMOTION",
        "SYSTEM",
      ],
      payment_method: [
        "CASH",
        "UPI",
        "BANK_TRANSFER",
        "CARD",
        "CHEQUE",
        "OTHER",
      ],
      payment_status: ["PENDING", "COMPLETED", "FAILED", "REFUNDED"],
      support_ticket_priority: ["LOW", "MEDIUM", "HIGH"],
      support_ticket_status: ["OPEN", "IN_PROGRESS", "RESOLVED", "CLOSED"],
    },
  },
} as const
