# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20150210074522) do

  create_table "ambulances", force: true do |t|
    t.integer  "seq_id"
    t.string   "site_type"
    t.string   "name"
    t.string   "address"
    t.string   "phone"
    t.float    "lat"
    t.float    "lng"
    t.integer  "number"
    t.string   "car_id"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "exist"
    t.text     "status"
  end

  create_table "hospitals", force: true do |t|
    t.string   "hospital_id"
    t.text     "name"
    t.text     "address"
    t.float    "lat"
    t.float    "lng"
    t.string   "report_full"
    t.integer  "wait_see"
    t.integer  "wait_push_bed"
    t.integer  "wait_bed"
    t.integer  "wait_cure_bed"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "missions", force: true do |t|
    t.integer  "seq_id"
    t.string   "start_lat"
    t.string   "start_lng"
    t.string   "end_lat"
    t.string   "end_lng"
    t.string   "processing_time"
    t.string   "hospital"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.text     "status"
    t.text     "structure"
  end

end
